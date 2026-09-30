# Guide de publication : Cabinet Kouadio & Associés

Document interne, non mis en ligne (voir `.vercelignore`). À suivre dans l'ordre.

## 1. Publier sur Vercel
**Option A : en ligne de commande (la plus rapide)**
1. Ouvrir un terminal dans ce dossier.
2. Installer l'outil une seule fois : `npm i -g vercel`
3. Se connecter une seule fois : `vercel login`
4. Publier : `vercel --prod`
5. À la question du framework, répondre **Other**. Dossier de sortie : `.` (le dossier courant).

**Option B : sans ligne de commande**
1. Aller sur vercel.com, puis *Add New* > *Project*.
2. Importer le dossier (via GitHub) ou utiliser l'interface de dépôt de fichiers.
3. Framework : **Other**. Pas de commande de build. Dossier de sortie : racine.

Le fichier `vercel.json` active déjà les URL propres (`/domaines`, `/contact`).

## 2. Vérifier le site en ligne (5 minutes)
- [ ] Les 6 pages s'ouvrent : `/`, `/domaines`, `/equipe`, `/actualites`, `/contact`, `/confidentialite`.
- [ ] Ouvrir en navigation privée : le site doit être accessible **sans connexion**. Si Vercel demande de se connecter, aller dans *Settings* > *Deployment Protection* et désactiver la protection pour ce projet.
- [ ] Sur mobile (ou en réduisant la fenêtre à 390 px) : le menu s'ouvre, rien ne dépasse.
- [ ] Console du navigateur (F12) : aucune erreur rouge.
- [ ] Le formulaire affiche le tampon « REÇUE » quand on le remplit (aucun message n'est réellement envoyé).
- [ ] En bas de page, « Code AZ » renvoie vers https://agnissanisaac.com

## 3. Envoyer le lien pour le portfolio
Envoyer l'adresse Vercel (du type `xxx.vercel.app`) avec :
- **Secteur** : `Cabinet d'avocats`
- **Tag** : `Droit · Cabinet d'avocats`
- **categoryLabel** : Site pour cabinet d'avocats
- **pitch** : Un site sobre et rassurant pour un cabinet d'avocats à Abidjan : domaines d'intervention, équipe et prise de rendez-vous.
- **tech** : HTML5 / CSS3, JavaScript, Formulaire de rendez-vous, Responsive design

## 4. Mentions à ne pas retirer
- **Crédit photo du Plateau** (légende sous l'image, page d'accueil) : obligatoire, licence CC BY 4.0, auteur Edison McCullen. Il est aussi rappelé sur la page Confidentialité.
- Mention « cabinet et personnes fictifs » en pied de page : à garder tant que ce n'est pas un vrai client.
- Signature « Site créé par Code AZ » : à garder.

## 5. Si un vrai cabinet veut ce site
1. Modifier le contenu dans `_build/build.js` (noms, adresse, téléphone, textes, horaires).
2. Remplacer le numéro WhatsApp (`WA`) et le téléphone (`PHONE`) par les vrais.
3. Brancher le formulaire sur un vrai service (email ou outil de formulaire) : aujourd'hui il est simulé, voir `js/main.js`.
4. Mettre de vraies photos (accord écrit) à la place des cachets de cire des fiches équipe, dans `img/`.
5. Faire relire la page Confidentialité par le client.
6. Régénérer les pages : `node _build/build.js`, puis republier (`vercel --prod`).

## 6. Modifier le site soi-même
- Contenu et structure des pages : `_build/build.js`. Après chaque changement : `node _build/build.js`.
- Couleurs et styles : `css/style.css` (variables en haut du fichier).
- Images : dossier `img/`, format WebP, 1 600 px de large maximum.
- Sources et licences des images : `_build/credits.md`.

## 7. Nettoyage avant publication (facultatif)
Les dossiers `_raw` (images d'origine lourdes), `_build` et `.claude` sont exclus par `.vercelignore` : ils ne partent pas en ligne.
