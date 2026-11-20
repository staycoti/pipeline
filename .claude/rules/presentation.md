# Couche présentation

`src/app/` n'appelle que la couche service (`src/server/services/`, via
`getContactsService()`), jamais la couche données. Elle n'importe rien de
`src/server/data/`.

Elle n'utilise que les composants et tokens du design system « Comptoir »
(shadcn/ui + variables de `globals.css`) : jamais de couleur en dur, uniquement
les classes de rôles (`bg-background`, `text-muted-foreground`, `bg-primary`…).

## Comment vérifier
Aucun import de `src/server/data` dans `src/app/` ; aucune valeur hexadécimale
de couleur (`#…`) dans les fichiers de `src/app/`, `globals.css` excepté.
