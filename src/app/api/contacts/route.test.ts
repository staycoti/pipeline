// Test d'intégration de la couche présentation : POST /api/contacts traverse
// service puis données et écrit une vraie ligne SQLite. Pas de mock.

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const dir = mkdtempSync(path.join(tmpdir(), "pipeline-route-test-"));

beforeAll(() => {
  // À poser avant le premier appel de getContactsService() (singleton lazy).
  process.env.PIPELINE_DB_PATH = path.join(dir, "route.db");
});

afterAll(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe("POST /api/contacts", () => {
  it("insère le contact en base puis redirige (303)", async () => {
    const { POST } = await import("./route");
    const request = new Request("http://localhost/api/contacts", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ name: "Leçon 3 couches" }),
    });

    // En dehors du runtime Next, redirect() lève une erreur à digest 303.
    await expect(POST(request)).rejects.toThrow(/NEXT_REDIRECT/);

    const { openLocalDb, initSchema } = await import("@/server/data/db");
    const { LibsqlContactsRepository } = await import(
      "@/server/data/contacts-repo"
    );
    const db = openLocalDb();
    await initSchema(db);
    const contacts = await new LibsqlContactsRepository(db).list();
    db.close();

    expect(contacts).toHaveLength(1);
    expect(contacts[0]).toMatchObject({ name: "Leçon 3 couches", stage: "new" });
  });
});
