import type {IApiCmsPagesList} from "~/_utils/apiCms";

export const useMenuIsOpen = () => useState<boolean>('menuIsOpen', () => false)

export const usePagesData = () => useState<IApiCmsPagesList>('pagesData', () => {
    return {
        pages: [
            {
                title: 'À l’affiche',
                slug: '/',
                subsections: [],
            },
            {
                title: 'Jeune public',
                slug: '/jeune-public',
                subsections: [],
            },
            {
                title: 'Événements',
                slug: '/evenements',
                subsections: [
                    "Événements spéciaux",
                    "65+",
                    "Cycle estival",
                    "Cours publics",
                    "Festivals",
                ],
            },
            {
                title: "Infos",
                slug: "infos",
                subsections: [
                    "Tarifs",
                    "Accès",
                    "Accès",
                    "Buvette",
                    "Équipe",
                    "Histoire",
                    "Soutiens",
                ]
            },
            {
                title:  "Médias",
                slug:   "medias",
                subsections: [],
            },
            {
                title:  "Location",
                slug:   "location",
                subsections: [
                    "Salle de cinéma",
                    "Salle de montage",
                    "Séances scolaires",
                ],
            },
            {
                title:  "Archives",
                slug:   "archives",
                subsections: [],
            },
        ]
    }
})
