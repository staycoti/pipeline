import type { Metadata } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import "./globals.css";

// Bascule de thème sans dépendre de l'hydratation React : un bouton HTML
// natif + ce script inline. Il applique la préférence avant le rendu
// (localStorage gagne, sinon le système : zéro flash), puis délègue les
// clics sur [data-theme-toggle]. Fonctionne même si le bundle JS client
// ne s'exécute pas.
const themeScript = `(function(){
function save(dark){try{localStorage.setItem("pipeline-theme",dark?"dark":"light")}catch(e){}}
var stored=null;try{stored=localStorage.getItem("pipeline-theme")}catch(e){}
var dark=stored==="dark"||(!stored&&window.matchMedia("(prefers-color-scheme: dark)").matches);
document.documentElement.classList.toggle("dark",dark);
function label(){var b=document.querySelector("[data-theme-toggle]");if(b)b.textContent=document.documentElement.classList.contains("dark")?"Mode clair":"Mode sombre";}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",label)}else{label()}
document.addEventListener("click",function(e){
var b=e.target&&e.target.closest?e.target.closest("[data-theme-toggle]"):null;
if(!b)return;
var next=!document.documentElement.classList.contains("dark");
document.documentElement.classList.toggle("dark",next);
save(next);
b.textContent=next?"Mode clair":"Mode sombre";
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
    <html
      lang="fr"
      className={`${archivo.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <div className="fixed right-6 top-6 z-50">
          <button
            type="button"
            data-theme-toggle
            className="rounded border border-input bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:border-foreground/40"
          >
            Thème
          </button>
        </div>
        {children}
      </body>
    </html>
  );
}
