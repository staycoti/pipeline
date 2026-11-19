// Critère d'acceptation : « après redémarrage de l'app, mes contacts sont
// toujours là ». Fermer puis rouvrir la connexion sur le même fichier SQLite
// simule le redémarrage. Ici c'est la vraie base, pas de mock.

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { initSchema, openLocalDb } from "@/server/data/db";
import { LibsqlContactsRepository } from "@/server/data/contacts-repo";
import { ContactsService } from "@/server/services/contacts";

const dir = mkdtempSync(path.join(tmpdir(), "pipeline-test-"));
const dbPath = path.join(dir, "contacts.db");

afterAll(() => {
  rmSync(dir, { recursive: true, force: true });
});

async function openService() {
  const db = openLocalDb(dbPath);
  await initSchema(db);
  return { db, service: new ContactsService(new LibsqlContactsRepository(db)) };
}

describe("persistance des contacts (vraie base SQLite)", () => {
  it("survit à une fermeture puis réouverture de la base", async () => {
    const first = await openService();
    await first.service.addContact({
      name: "Durand",
      email: "durand@example.com",
      company: "Acme",
    });
    first.db.close();

    const second = await openService();
    const contacts = await second.service.listContacts();
    second.db.close();

    expect(contacts).toHaveLength(1);
    expect(contacts[0]).toMatchObject({
      name: "Durand",
      email: "durand@example.com",
      company: "Acme",
      stage: "new",
    });
  });
});
