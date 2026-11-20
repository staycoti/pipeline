import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Geist_Mono } from "next/font/google";
import "./globals.css";

// Bascule de thème sans état React : un bouton HTML natif + ce script.
// - Avant le rendu : applique la préférence (localStorage gagne, sinon le
//   système : zéro flash). Injecté via next/script strategy
//   « beforeInteractive », le mécanisme officiel — un <script> nu dans un
//   composant React est ignoré au rendu client.
// - Au clic : délègue sur [data-theme-toggle]. Le libellé du bouton est
//   changé par CSS pur (deux spans, variante .dark) : le script ne touche
//   jamais au texte, sinon il diverge du HTML hydraté par React.
const themeScript = `(function(){
var stored=null;try{stored=localStorage.getItem("pipeline-theme")}catch(e){}
var dark=stored==="dark"||(!stored&&window.matchMedia("(prefers-color-scheme: dark)").matches);
document.documentElement.classList.toggle("dark",dark);
document.addEventListener("click",function(e){
var b=e.target&&e.target.closest?e.target.closest("[data-theme-toggle]"):null;
if(!b)return;
var next=!document.documentElement.classList.contains("dark");
document.documentElement.classList.toggle("dark",next);
try{localStorage.setItem("pipeline-theme",next?"dark":"light")}catch(e){}
});
})();`;

// Design system « Comptoir » : grotesque Archivo pour toute l'UI.
const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pipeline — prospection",
  description: "Mini CRM de prospection : contacts, étapes, relances.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning sur <html> : motif officiel Next (guide dark
    // mode). Le script beforeInteractive ajoute la classe « dark » avant
    // l'hydratation ; React verrait un attribut différent du sien et leverait
    // un avertissement. Seul cet élément est dispensé, rien d'autre.
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${archivo.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="pipeline-theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <div className="fixed right-6 top-6 z-50">
          <button
            type="button"
            data-theme-toggle
            className="rounded border border-input bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:border-foreground/40"
          >
            {/* Libellé rendu par CSS seul : « Mode sombre » en clair,
                « Mode clair » en sombre — ce que le clic va faire. */}
            <span className="dark:hidden">Mode sombre</span>
            <span className="hidden dark:inline">Mode clair</span>
          </button>
        </div>
        {children}
      </body>
    </html>
  );
}
