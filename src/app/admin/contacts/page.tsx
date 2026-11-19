// Liste des contacts lus depuis la base + formulaire d'ajout.
// Le formulaire poste vers /api/contacts : écriture réelle, puis redirect.

import { getContactsService } from "@/server/data/contacts-service";

// Page pilotée par les searchParams et la base : rendu bloquant assumé
// (exigé par Cache Components, à la place de l'ancien « force-dynamic »).
export const instant = false;

async function readSearchParams(
  searchParams: Promise<Record<string, string | string[] | undefined>>,
) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : null;
  const added = params.added !== undefined;
  return { error, added };
}

export default async function AdminContactsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { error, added } = await readSearchParams(searchParams);
  const contacts = await (await getContactsService()).listContacts();

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-semibold mb-6">Contacts</h1>

      {error ? (
        <p className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-800">
          {error}
        </p>
      ) : null}
      {added ? (
        <p className="mb-4 rounded border border-green-300 bg-green-50 p-3 text-green-800">
          Contact ajouté.
        </p>
      ) : null}

      <form
        action="/api/contacts"
        method="post"
        className="mb-8 flex flex-col gap-3"
      >
        <input
          name="name"
          placeholder="Nom *"
          required
          className="rounded border border-neutral-300 p-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="rounded border border-neutral-300 p-2"
        />
        <input
          name="company"
          placeholder="Société"
          className="rounded border border-neutral-300 p-2"
        />
        <button
          type="submit"
          className="self-start rounded bg-neutral-900 px-4 py-2 text-white"
        >
          Ajouter
        </button>
      </form>

      {contacts.length === 0 ? (
        <p className="text-neutral-500">Aucun contact pour le moment.</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Nom</th>
              <th className="py-2">Email</th>
              <th className="py-2">Société</th>
              <th className="py-2">Étape</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-b">
                <td className="py-2">{contact.name}</td>
                <td className="py-2">{contact.email ?? "-"}</td>
                <td className="py-2">{contact.company ?? "-"}</td>
                <td className="py-2">{contact.stage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
