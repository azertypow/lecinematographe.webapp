import type {IApiCmsPagesList} from "~/_utils/apiCms";

export const useMenuIsOpen = () => useState<boolean>('menuIsOpen', () => false)

export const usePagesData = () => useState<IApiCmsPagesList>('pagesData', () => {
    return {
        pages: [
            {
                title: 'Évènements',
                slug: '/evenements',
                subsections: [
                    "65+",
                    "Cycle estival",
                    "Cours publics",
                    "Festivals",
                ],
            },
            {
                title: 'Jeune Public',
                slug: '/jeune-public',
                subsections: [],
            },
            {
                title: 'Location',
                slug: '/location',
                subsections: [
                    "Salle de cinéma",
                    "Salle de montage",
                    "Séances scolaires",
                ],
            },
            {
                title: 'Médias',
                slug: '/media',
                subsections: [],
            },
            {
                title: 'Infos',
                slug: '/infos',
                subsections: [
                    "Tarifs",
                    "Accès",
                    "Buvette",
                    "Équipe",
                    "Histoire",
                    "Soutiens",
                ],
            },
        ]
    }
})
