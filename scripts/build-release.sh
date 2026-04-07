#!/usr/bin/env bash
set -euo pipefail

echo "1/3 - Build statique Nuxt"
npm run generate

echo "2/3 - Préparation du dossier release"
mkdir -p release
rm -f release/public.zip

if [ ! -d ".output/public" ]; then
  echo "Erreur: .output/public est introuvable."
  exit 1
fi

echo "3/3 - Création de release/public.zip"
(
  cd .output
  zip -r ../release/public.zip public >/dev/null
)

echo "Archive prête: release/public.zip"
