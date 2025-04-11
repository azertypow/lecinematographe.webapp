/**
 * Convertit un code pays (ISO 3166-1 alpha-2) en nom complet
 * @param code - Code pays sur 2 lettres (ex: "FR", "US")
 * @returns Nom du pays en français ou nom traduit si inconnu dans la base
 */
export function getCountryName(code: string): {translated: boolean, value: string} {
    const countries: Record<string, string> = {
        // Europe
        FR: "France",
        DE: "Allemagne",
        IT: "Italie",
        ES: "Espagne",

        GB: "Royaume-Uni",
        UK: "Royaume-Uni",
        EN: "Angleterre",

        BE: "Belgique",
        CH: "Suisse",
        LU: "Luxembourg",
        PT: "Portugal",
        NL: "Pays-Bas",
        IE: "Irlande",
        SE: "Suède",
        NO: "Norvège",
        DK: "Danemark",
        FI: "Finlande",
        IS: "Islande",
        AT: "Autriche",
        GR: "Grèce",
        PL: "Pologne",
        CZ: "République Tchèque",
        HU: "Hongrie",
        SK: "Slovaquie",
        RO: "Roumanie",
        BG: "Bulgarie",
        RS: "Serbie",
        HR: "Croatie",
        SI: "Slovénie",

        // Amériques
        US: "États-Unis",
        CA: "Canada",
        MX: "Mexique",
        BR: "Brésil",
        AR: "Argentine",
        CL: "Chili",
        CO: "Colombie",
        PE: "Pérou",
        VE: "Venezuela",
        CR: "Costa Rica",
        CU: "Cuba",
        DO: "République Dominicaine",
        JM: "Jamaïque",

        // Asie
        JP: "Japon",
        CN: "Chine",
        KR: "Corée du Sud",
        KP: "Corée du Nord",
        IN: "Inde",
        TH: "Thaïlande",
        VN: "Vietnam",
        ID: "Indonésie",
        MY: "Malaisie",
        PH: "Philippines",
        SG: "Singapour",
        IL: "Israël",
        TR: "Turquie",
        SA: "Arabie Saoudite",
        AE: "Émirats Arabes Unis",
        IQ: "Irak",
        IR: "Iran",

        // Afrique
        ZA: "Afrique du Sud",
        EG: "Égypte",
        MA: "Maroc",
        DZ: "Algérie",
        TN: "Tunisie",
        SN: "Sénégal",
        CI: "Côte d'Ivoire",
        NG: "Nigéria",
        KE: "Kenya",
        ET: "Éthiopie",

        // Océanie
        AU: "Australie",
        NZ: "Nouvelle-Zélande",
        PF: "Polynésie Française",
    };

    // Retourne le nom ou undefined si le code n'existe pas
    return countries[code.toUpperCase()] ? {
        value: countries[code.toUpperCase()],
        translated: true
    } : {
        value: code.toUpperCase(),
        translated: false,
    }

}




