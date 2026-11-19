// Vitre du design system « Comptoir » : tokens et composants du thème
// appliqué à l'app, rendus avec le thème lui-même (aucune donnée, aucune base).

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
        l&apos;app utilise, défini dans globals.css.
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

      <Section title="Boutons">
        <div className="flex flex-wrap items-center gap-3">
          <button className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Primaire
          </button>
          <button className="rounded border border-input bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/40">
            Secondaire
          </button>
          <button className="rounded px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            Fantôme
          </button>
          <button
            disabled
            className="cursor-not-allowed rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-45"
          >
            Désactivé
          </button>
          <button className="rounded bg-destructive px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
            Destructif
          </button>
        </div>
      </Section>

      <Section title="Champs">
        <div className="grid max-w-md gap-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Nom</span>
            <input
              defaultValue="Camille Ferrand"
              className="w-full rounded border border-input bg-card p-2 text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring/40"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Email</span>
            <input
              defaultValue="camille valois"
              className="w-full rounded border border-destructive/60 bg-card p-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-destructive/40"
            />
            <span className="mt-1 block text-xs text-destructive">
              Email invalide : saisie sans arobase.
            </span>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Société
            </span>
            <input
              disabled
              placeholder="Lecture seule"
              className="w-full cursor-not-allowed rounded border border-input bg-secondary/60 p-2 text-sm text-muted-foreground"
            />
          </label>
        </div>
      </Section>

      <Section title="Carte de contact et étape">
        <div className="max-w-sm rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md">
          <div className="text-sm font-semibold">Camille Ferrand</div>
          <div className="mt-0.5 text-sm text-muted-foreground">
            Menuiserie Valois · camille@valois.fr
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Contacté
            </span>
            <span className="text-xs tabular-nums text-muted-foreground">
              relance le 21 nov.
            </span>
          </div>
        </div>
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
