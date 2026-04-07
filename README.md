# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Déploiment


```
npm run generate
```

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
