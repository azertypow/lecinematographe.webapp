/**
 * Convertit un code pays (ISO 3166-1 alpha-2) en nom complet
 * @param code - Code pays sur 2 lettres (ex: "FR", "US")
 * @returns Nom du pays en français ou nom traduit si inconnu dans la base
 */
export function getLanguageName(code?: string | {de: string, en: string, fr: string, iso2: string}): {translated: boolean, value: string} {
    const countries: Record<string, string> = {
        FR: "Français",
        DE: "Allemand",
        IT: "Italien",
        ES: "Espagnol",
        EN: "Anglais",
        PT: "Portugais",
        NL: "Néerlandais",
        SV: "Suédois",
        NO: "Norvégien",
        DA: "Danois",
        FI: "Finnois",
        IS: "Islandais",
        EL: "Grec",
        PL: "Polonais",
        CS: "Tchèque",
        HU: "Hongrois",
        SK: "Slovaque",
        RO: "Roumain",
        BG: "Bulgare",
        SR: "Serbe",
        HR: "Croate",
        SL: "Slovène",

        // Asie
        JA: "Japonais",
        ZH: "Chinois",
        KO: "Coréen",
        HI: "Hindi",
        TH: "Thaï",
        VI: "Vietnamien",
        ID: "Indonésien",
        MS: "Malais",
        TL: "Tagalog",
        HE: "Hébreu",
        TR: "Turc",
        AR: "Arabe",
        FA: "Persan",

        // Autres
        RU: "Russe",
        AF: "Afrikaans",
        SW: "Swahili"
    };

    if(!code) return {value: "Inconnu", translated: false}

    if( typeof code === 'string') return countries[code.toUpperCase()] ? {
        value: countries[code.toUpperCase()],
        translated: true
    } : {
        value: code.toUpperCase(),
        translated: false,
    }

    return {value: code.fr, translated: false}

}
