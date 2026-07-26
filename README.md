# Préparation SOG — v2

Application PWA (React + TypeScript + Vite + Tailwind) pour préparer le concours
Sous-Officier de Gendarmerie, tout en suivant entraînement, nutrition et hygiène de vie.
Pensée pour un usage quotidien : **moins de 2 minutes par jour**.

## Fonctionnalités clés

- **Comptes** pseudo + mot de passe (création / connexion / déconnexion), plusieurs profils.
- **Bilan du soir guidé** : chaque soir un assistant s'ouvre et pose les questions une par une
  (séance, exercices, course, nutrition, eau, pas, poids, sommeil, énergie, motivation).
- **Analyse automatique** : résumé façon coach + détection des records, plateaus, régressions,
  baisse de sommeil et oublis d'hydratation (100 % local, sans clé ni service externe).
- **Profil pré-configuré** (objectif SOG, 1m75, 76 → 70 kg, 20 h/sem, objectifs quotidiens).
- **Progression calculée seule** + graphiques par exercice / cardio / poids.
- **Base d'exercices** par groupe musculaire et **liste de courses** pré-remplie.
- **Installable** sur téléphone (PWA, plein écran, hors-ligne).

## Démarrage

```bash
npm install
npm run dev      # développement
npm run build    # build de production (dossier dist/)
npm run preview  # prévisualiser le build
```

## Comptes & sauvegarde

Le pseudo, le mot de passe (haché en SHA-256) et toute la progression sont enregistrés
**sur l'appareil** (LocalStorage), cloisonnés par compte. Rien n'est envoyé sur Internet.

⚠️ Deux limites d'un site 100 % statique :
- Le mot de passe protège l'affichage mais n'est pas une sécurité forte (les données du
  navigateur restent lisibles par quelqu'un ayant accès à l'appareil).
- Les données **ne se synchronisent pas** entre appareils. Un compte créé sur le téléphone
  n'apparaît pas sur le PC (et inversement). Pour cela → voir la synchro Supabase ci-dessous.

Sauvegarde manuelle : Paramètres → Exporter (JSON). Restauration : Importer.

## Installer sur le téléphone

Héberge d'abord le site (voir plus bas), ouvre l'URL sur le téléphone, puis :

- **Android (Chrome)** : un bouton « Installer l'application » apparaît dans l'app
  (Paramètres → Installer), ou menu ⋮ → « Installer l'application ».
- **iPhone / iPad (Safari)** : bouton **Partager** → **« Sur l'écran d'accueil »**.

L'app s'ouvre ensuite en plein écran, comme une application native, et fonctionne hors-ligne.

## Déploiement (hébergement)

Statique : héberger le dossier `dist/` sur **Netlify** (glisser-déposer), **Vercel** ou
**GitHub Pages**. `base: "./"` + HashRouter → fonctionne aussi dans un sous-dossier.

> Important : l'installation PWA et les comptes (hachage) nécessitent **HTTPS**.
> Netlify / Vercel / GitHub Pages fournissent le HTTPS automatiquement.

## Synchro entre appareils (optionnel — Supabase, gratuit)

L'architecture est prête : deux points d'extension uniques, sans toucher aux composants.

1. `src/lib/auth.ts` → `export const auth = new LocalAuthProvider()`
   remplacer par un `SupabaseAuthProvider` (mêmes méthodes `signUp/signIn/signOut/current`).
2. `src/lib/storage.ts` → `makeStateRepository(userId)`
   remplacer le corps de `load`/`save` par une lecture/écriture d'une table Supabase
   (par ex. `app_state` avec colonnes `user_id`, `state jsonb`).

Étapes côté Supabase (une fois) :
1. Créer un projet gratuit sur supabase.com, récupérer l'URL du projet et la clé « anon ».
2. Activer l'authentification (email + mot de passe, ou pseudo via table dédiée).
3. Créer la table `app_state (user_id uuid primary key, state jsonb, updated_at timestamptz)`
   avec Row Level Security limitant chaque ligne à `auth.uid()`.
4. Renseigner l'URL et la clé (fichier `.env` : `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

Une fois ces valeurs disponibles, les deux fichiers ci-dessus se branchent en quelques lignes
et la connexion fonctionne à l'identique sur téléphone et PC.
