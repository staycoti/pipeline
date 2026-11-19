# PRODUCT.md · Pipeline

Capturé depuis `INTENT.md` (vérité produit écrite par l'auteur, pas d'interview).

## Produit
Mini CRM de prospection, mono-utilisateur, local d'abord. L'utilisateur note ses
contacts prospects, les fait avancer d'étape en étape (nouveau → contacté →
proposition → gagné / perdu), et veut savoir qui relancer aujourd'hui.

## Utilisateur & scène
Une seule personne (l'auteur), chaque jour, sur son Mac, en lumière intérieure,
en mode tâche rapide : ajouter un contact entre deux appels, mettre à jour une
étape, scanner la liste des relances. Outil de travail, pas vitrine.

## Surfaces
- `/admin/contacts` : liste + formulaire d'ajout (existant, mode Operate)
- à venir : relances du jour, changement d'étape (lots suivants — hors périmètre ici)

## Contraintes
Next.js 16 (App Router, Cache Components), Tailwind 4, shadcn/ui (base Radix,
thème via CSS variables dans globals.css), SQLite local via libsql. Déploiement
Vercel prévu. Pas d'auth, pas de multi-util. Français dans l'interface.

## Ce qui doit rester vrai
Écriture réelle en base, 3 couches (présentation/service/données), tests par
couche. Le design system ne doit rien casser de cela et s'applique par les
tokens du thème shadcn.

## Ce qui serait faux
Une UI générique « template » ; une app qui a l'air d'un dashboard SaaS
enterprise ; des écrans qui ne ressemblent pas à l'outil qu'on ouvre 20 fois
par jour.
