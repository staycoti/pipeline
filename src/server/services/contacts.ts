// Couche service : cas d'utilisation. Elle ne connaît la base que par
// l'interface ContactsRepository (implémentée par la couche données).

import {
  normalizeNewContactInput,
  type Contact,
  type NewContactInput,
} from "@/server/domain/contacts";

export interface ContactsRepository {
  list(): Promise<Contact[]>;
  add(input: NewContactInput): Promise<Contact>;
}

export class ContactsService {
  constructor(private readonly repo: ContactsRepository) {}

  listContacts(): Promise<Contact[]> {
    return this.repo.list();
  }

  async addContact(input: NewContactInput): Promise<Contact> {
    const normalized = normalizeNewContactInput(input);
    if (!normalized.ok) {
      throw new Error(normalized.error);
    }
    return this.repo.add(normalized.value);
  }
}
