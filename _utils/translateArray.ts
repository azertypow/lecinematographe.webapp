// Le mapping des traductions
const translations: Record<string, string> = {
    director: 'cinéaste(s)',
    actor: 'avec',
    producer: 'production',
    photography: 'image',
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
