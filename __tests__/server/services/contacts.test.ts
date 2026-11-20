// Tests unitaires des règles métier, avec un faux repository : aucune base.

import { describe, expect, it } from "vitest";
import type { Contact, NewContactInput } from "@/server/domain/contacts";
import {
  ContactsService,
  type ContactsRepository,
} from "@/server/services/contacts";

class FakeRepo implements ContactsRepository {
  saved: NewContactInput[] = [];

  async list(): Promise<Contact[]> {
    return [];
  }

  async add(input: NewContactInput): Promise<Contact> {
    this.saved.push(input);
    const now = new Date().toISOString();
    return {
      id: "fake-id",
      name: input.name,
      email: input.email ?? null,
      company: input.company ?? null,
      stage: "new",
      createdAt: now,
      updatedAt: now,
    };
  }
}

describe("ContactsService.addContact", () => {
  it("rejette un nom vide", async () => {
    const service = new ContactsService(new FakeRepo());
    await expect(service.addContact({ name: "   " })).rejects.toThrow(
      "Le nom du contact est obligatoire.",
    );
  });

  it("rejette un email invalide", async () => {
    const service = new ContactsService(new FakeRepo());
    await expect(
      service.addContact({ name: "Durand", email: "pas-un-email" }),
    ).rejects.toThrow(/Email invalide/);
  });

  it("normalise la saisie avant d'écrire", async () => {
    const repo = new FakeRepo();
    await new ContactsService(repo).addContact({
      name: "  Durand  ",
      email: "  ",
      company: undefined,
    });
    expect(repo.saved).toEqual([{ name: "Durand", email: null, company: null }]);
  });
});
