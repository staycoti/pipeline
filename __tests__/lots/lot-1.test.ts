// Suite d'acceptation du Lot 1 « Ajouter un contact » (docs/lots.md).
// Un test par critère, sur vraie base SQLite dans un fichier temporaire —
// jamais de mock pour prouver la persistance.
//
// Note d'honnêteté (leçon Ultra QW-18) : le code du lot 1 a été livré avant
// cette suite (tranches précédentes, `bb6bbb1`..`138124b`). Ces tests
// verrouillent les critères a posteriori ; l'étape rouge du TDD a été
// démontrée en neutralisant temporairement la couche données.

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { normalizeNewContactInput } from "@/server/domain/contacts";

const dir = mkdtempSync(path.join(tmpdir(), "pipeline-lot1-"));
const dbPath = path.join(dir, "lot1.db");

beforeAll(() => {
  // À poser avant le premier appel de getContactsService() (singleton lazy).
  process.env.PIPELINE_DB_PATH = dbPath;
});

afterAll(() => {
  rmSync(dir, { recursive: true, force: true });
});

// Ouvre un client distinct sur le même fichier : prouve que les lignes sont
// sur le disque, pas seulement en mémoire de la connexion du singleton.
async function openDb() {
  const { openLocalDb, initSchema } = await import("@/server/data/db");
  const db = openLocalDb(dbPath);
  await initSchema(db);
  return db;
}

async function listCount(): Promise<number> {
  const { LibsqlContactsRepository } = await import(
    "@/server/data/contacts-repo"
  );
  const db = await openDb();
  const contacts = await new LibsqlContactsRepository(db).list();
  db.close();
  return contacts.length;
}

function formRequest(fields: Record<string, string>): Request {
  return new Request("http://localhost/api/contacts", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(fields),
  });
}

describe("Lot 1 · Ajouter un contact", () => {
  it("critère 1 — nom valide : redirection vers la liste et ligne écrite en base", async () => {
    const { POST } = await import("@/app/api/contacts/route");
    // En dehors du runtime Next, redirect() lève une erreur à digest 303.
    await expect(POST(formRequest({ name: "Camille Ferrand" }))).rejects.toThrow(
      /NEXT_REDIRECT/,
    );

    const db = await openDb();
    const { LibsqlContactsRepository } = await import(
      "@/server/data/contacts-repo"
    );
    const contacts = await new LibsqlContactsRepository(db).list();
    db.close();

    expect(contacts).toHaveLength(1);
    expect(contacts[0]).toMatchObject({ name: "Camille Ferrand", stage: "new" });
  });

  it("critère 2 — sans nom : bandeau d'erreur et aucune ligne écrite", async () => {
    const { POST } = await import("@/app/api/contacts/route");
    const error = await POST(formRequest({ name: "" })).then(
      () => null,
      (e: unknown) => e as Error,
    );

    expect(error).toBeInstanceOf(Error);
    expect(String(error?.message)).toMatch(/NEXT_REDIRECT/);
    // La redirection cible porte ?error= (source du bandeau sur la liste).
    expect(decodeURIComponent(String((error as { digest?: string }).digest)))
      .toContain("?error=");
    // Et rien de nouveau en base : le compteur est toujours à 1 (le critère 1).
    expect(await listCount()).toBe(1);
  });

  it("critère 3 — fermer puis rouvrir la base : le contact est toujours listé", async () => {
    const first = await openDb();
    const { LibsqlContactsRepository } = await import(
      "@/server/data/contacts-repo"
    );
    const stored = await new LibsqlContactsRepository(first).list();
    first.close();

    const second = await openDb();
    const afterReopen = await new LibsqlContactsRepository(second).list();
    second.close();

    expect(stored.map((c) => c.name)).toContain("Camille Ferrand");
    expect(afterReopen.map((c) => c.name)).toContain("Camille Ferrand");
  });

  it("critère 4 — email malformé : refusé par la règle métier", () => {
    const result = normalizeNewContactInput({
      name: "Camille",
      email: "camille valois",
    });
    expect(result.ok).toBe(false);
  });
});
