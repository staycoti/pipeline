// Couche domaine : types et règles métier, sans dépendance à la base ni à l'UI.

export const STAGES = ["new", "contacted", "proposal", "won", "lost"] as const;

export type Stage = (typeof STAGES)[number];

export const FIRST_STAGE: Stage = "new";

export interface Contact {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  stage: Stage;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface NewContactInput {
  name: string;
  email?: string | null;
  company?: string | null;
}

export type NormalizedContactInput = Required<Pick<NewContactInput, "name">> &
  Pick<NewContactInput, "email" | "company">;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Normalise et valide une saisie ; renvoie une erreur lisible si invalide.
export function normalizeNewContactInput(
  input: NewContactInput,
):
  | { ok: true; value: NormalizedContactInput }
  | { ok: false; error: string } {
  const name = input.name?.trim() ?? "";
  if (!name) {
    return { ok: false, error: "Le nom du contact est obligatoire." };
  }
  const email = input.email?.trim() || null;
  if (email && !EMAIL_RE.test(email)) {
    return { ok: false, error: `Email invalide : ${email}` };
  }
  const company = input.company?.trim() || null;
  return { ok: true, value: { name, email, company } };
}

export function isStage(value: unknown): value is Stage {
  return (STAGES as readonly unknown[]).includes(value);
}
