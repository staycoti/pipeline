// Vitre du design system « Comptoir » : tokens et composants du thème
// appliqué à l'app, rendus avec le thème lui-même (aucune donnée, aucune base).
// Chaque section montre le composant shadcn réel utilisé dans l'app.

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Le libellé n'affiche pas de valeur hexadécimale : elle diffère entre
// mode clair et mode sombre. La pastille, elle, montre la vraie valeur
// du thème actif via var().
function Token({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex flex-col">
      <div
        className="h-14 rounded-lg border border-border"
        style={{ background: `var(${name})` }}
      />
      <span className="mt-2 text-xs font-medium">{name}</span>
      <span className="text-xs text-muted-foreground">{role}</span>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="mb-5 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-3xl px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Comptoir</h1>
      <p className="mt-2 max-w-[60ch] text-muted-foreground">
        Design system de Pipeline : encrier sur porcelaine, un accent bleu profond
        unique, typo Archivo. Ce que cette page affiche est exactement ce que
        l&apos;app utilise : composants shadcn habillés par les tokens de
        globals.css. Chaque section est le composant réel, pas une copie.
      </p>

      <Section title="Couleurs">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Token name="--background" role="fond de page" />
          <Token name="--card" role="surface, champs" />
          <Token name="--primary" role="accent, actions" />
          <Token name="--foreground" role="texte principal" />
          <Token name="--muted-foreground" role="texte secondaire" />
          <Token name="--border" role="filets" />
          <Token name="--accent" role="nuance, bandeaux" />
          <Token name="--destructive" role="erreur" />
        </div>
      </Section>

      <Section title="Typographie — Archivo">
        <div className="space-y-4">
          <p className="text-3xl font-bold tracking-tight">
            Qui relancer cette semaine
          </p>
          <p className="text-lg font-semibold">Titre de section, intermédiaire</p>
          <p className="max-w-[62ch] leading-relaxed">
            Corps de texte à quatorze à seize pixels, mesure de soixante-deux
            caractères environ : la lecture rapide d&apos;une liste de contacts
            entre deux appels.
          </p>
          <p className="text-sm text-muted-foreground">
            Texte secondaire : métadonnées, dates, compteurs. Chiffres alignés.
          </p>
        </div>
      </Section>

      <Section title="Boutons — Button">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primaire</Button>
          <Button variant="outline">Secondaire</Button>
          <Button variant="ghost">Fantôme</Button>
          <Button disabled>Désactivé</Button>
          <Button variant="destructive">Destructif</Button>
        </div>
      </Section>

      <Section title="Champs — Label + Input">
        <div className="grid max-w-md gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="ds-nom">Nom</Label>
            <Input id="ds-nom" defaultValue="Camille Ferrand" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ds-mail">Email</Label>
            <Input id="ds-mail" aria-invalid defaultValue="camille valois" />
            <span className="text-xs text-destructive">
              Email invalide : saisie sans arobase.
            </span>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ds-soc" className="text-muted-foreground">
              Société
            </Label>
            <Input id="ds-soc" disabled placeholder="Lecture seule" />
          </div>
        </div>
      </Section>

      <Section title="Carte de contact et étape — Card + Badge">
        <Card className="max-w-sm">
          <CardContent>
            <div className="text-sm font-semibold">Camille Ferrand</div>
            <div className="mt-0.5 text-sm text-muted-foreground">
              Menuiserie Valois · camille@valois.fr
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Badge className="gap-1.5 bg-accent text-accent-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Contacté
              </Badge>
              <span className="text-xs tabular-nums text-muted-foreground">
                relance le 21 nov.
              </span>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section title="Bandeaux">
        <div className="space-y-3">
          <p className="rounded border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            Le nom du contact est obligatoire.
          </p>
          <p className="rounded border border-accent-foreground/25 bg-accent p-3 text-sm text-accent-foreground">
            Contact ajouté.
          </p>
        </div>
      </Section>
    </main>
  );
}
