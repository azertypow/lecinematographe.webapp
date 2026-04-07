#!/usr/bin/env bash
set -euo pipefail

: "${INFOMANIAK_HOST:?Variable manquante: INFOMANIAK_HOST}"
: "${INFOMANIAK_USER:?Variable manquante: INFOMANIAK_USER}"
: "${INFOMANIAK_REMOTE_PATH:?Variable manquante: INFOMANIAK_REMOTE_PATH}"

INFOMANIAK_PORT="${INFOMANIAK_PORT:-22}"
EXPECTED_REMOTE_PATH="/sites/lecinematographe.ch"
MODE="${1:-deploy}"

if ! command -v rsync >/dev/null 2>&1; then
  echo "Erreur: rsync est requis."
  exit 1
fi

if [ "${INFOMANIAK_REMOTE_PATH}" != "${EXPECTED_REMOTE_PATH}" ]; then
  echo "Erreur: INFOMANIAK_REMOTE_PATH doit être exactement '${EXPECTED_REMOTE_PATH}'."
  echo "Valeur actuelle: '${INFOMANIAK_REMOTE_PATH}'"
  exit 1
fi

echo "1/3 - Génération du site statique"
npm run generate

if [ ! -d ".output/public" ]; then
  echo "Erreur: .output/public est introuvable."
  exit 1
fi

echo "2/3 - Test de connexion SSH"
ssh -p "${INFOMANIAK_PORT}" "${INFOMANIAK_USER}@${INFOMANIAK_HOST}" "echo 'Connexion OK'" >/dev/null

echo "Cible de déploiement: ${INFOMANIAK_USER}@${INFOMANIAK_HOST}:${INFOMANIAK_REMOTE_PATH}/"

if [ "${MODE}" = "--dry-run" ]; then
  RSYNC_FLAGS="-avzn --delete"
  STEP_LABEL="3/3 - Simulation rsync (dry-run)"
elif [ "${MODE}" = "--safe" ]; then
  RSYNC_FLAGS="-avz"
  STEP_LABEL="3/3 - Synchronisation vers Infomaniak (sans suppression)"
else
  RSYNC_FLAGS="-avz --delete"
  STEP_LABEL="3/3 - Synchronisation vers Infomaniak"
fi

if [ "${MODE}" != "--dry-run" ] && [ "${MODE}" != "--yes" ]; then
  printf "Confirmer le déploiement réel vers cette cible ? (yes/no): "
  read -r ANSWER
  if [ "${ANSWER}" != "yes" ]; then
    echo "Déploiement annulé."
    exit 0
  fi
fi

echo "${STEP_LABEL}"
rsync ${RSYNC_FLAGS} \
  -e "ssh -p ${INFOMANIAK_PORT}" \
  ".output/public/" \
  "${INFOMANIAK_USER}@${INFOMANIAK_HOST}:${INFOMANIAK_REMOTE_PATH}/"

if [ "${MODE}" = "--dry-run" ]; then
  echo "Simulation terminée. Aucun fichier distant n'a été modifié."
elif [ "${MODE}" = "--safe" ]; then
  echo "Déploiement terminé (mode sans suppression)."
else
  echo "Déploiement terminé."
fi
