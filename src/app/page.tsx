import { redirect } from "next/navigation";

// Racine du mini CRM : l'écran de travail unique est la liste des contacts.
export default function Home() {
  redirect("/admin/contacts");
}
