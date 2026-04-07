# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Déploiement (Infomaniak)

### Option 1 - Script de déploiement direct (recommandé)

1. Créer un fichier local `.env.deploy` depuis `.env.deploy.example`
2. Renseigner les accès SSH/SFTP Infomaniak
3. Lancer :

```bash
set -a && source .env.deploy && set +a && npm run deploy:infomaniak
```

Ce script :
- lance `nuxt generate`
- synchronise `.output/public` vers ton dossier web distant
- supprime les anciens fichiers distants qui n'existent plus en local (`--delete`)

Chemin distant attendu (protégé): `/sites/lecinematographe.ch`

### Dry-run (fortement recommandé avant un vrai push)

```bash
set -a && source .env.deploy && set +a && npm run deploy:infomaniak:dry
```

Cette commande simule la synchronisation (`rsync -n`) sans modifier le serveur.

### Déploiement réel

```bash
set -a && source .env.deploy && set +a && npm run deploy:infomaniak
```

Le script demande une confirmation interactive (`yes/no`) avant d'envoyer les fichiers.

### Déploiement "safe" (sans suppression distante)

```bash
set -a && source .env.deploy && set +a && npm run deploy:infomaniak:safe
```

Ce mode n'utilise pas `--delete` et laisse les anciens fichiers sur le serveur.

### Option 2 - FileZilla

1. Générer le site :

```bash
npm run generate
```

2. Dans FileZilla, créer un site avec :
- Protocole : `SFTP - SSH File Transfer Protocol`
- Hôte : valeur `INFOMANIAK_HOST`
- Port : `22` (ou ton port)
- Utilisateur : valeur `INFOMANIAK_USER`
- Mot de passe ou clé SSH

3. Transférer **le contenu** de `.output/public` vers le dossier distant (`/sites/lecinematographe.ch`)
4. Vérifier que `index.html` est à la racine du dossier web

### Préparer une archive zip (optionnel)

```bash
npm run deploy:prepare
```

Crée `release/public.zip`, utile si tu préfères uploader une archive.

## Variables d'environnement

Créer un fichier `.env` (non versionné) en partant de `.env.example` :

```
NUXT_PUBLIC_LECINEMATOGRAPHE_ENGINE_TOKEN=...
```


## appel a l'api lié au service de ticketatck

[apiTicket.ts](_utils/apiTicket.ts)

## appel a l'api lié au service du CMS

[apiCms.ts](_utils/apiCms.ts)


## pour la mise en ligne

il faut simplement déploiyer tout ce qui est dans le dossier .output/public/
