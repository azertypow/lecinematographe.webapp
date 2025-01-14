// Le mapping des traductions
const translations: Record<string, string> = {
    director: 'réalisateur.ice.xs',
    actor: 'acteur.ice.xs',
    producer: 'producteur.ice.xs'
};

export function translateActivities(
    data: {
        "activity": string,
        "firstname": string,
        "lastname": string
    }[]
):
    {
        "activity": string,
        "firstname": string,
        "lastname": string
    }[] {
    return data.map((item) => ({
        ...item,
        activity: translations[item.activity] || item.activity // Garde l'activité originale si pas de traduction
    }));
}
