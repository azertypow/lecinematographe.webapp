import type {IApiCmsPagesList} from "~/_utils/apiCms";

export const useMenuIsOpen = () => useState<boolean>('menuIsOpen', () => false)

export const usePagesData = () => useState<IApiCmsPagesList>('pagesData', () => {
    return {
        pages: [
            {
                title: 'Événements',
                slug: '/evenements',
                subsections: [],
            },
            {
                title: 'Jeune Public',
                slug: '/jeune-public',
                subsections: [
                    'bonjour',
                    'hello',
                    'hey',
                    'guttentag',
                ],
            },
            {
                title: 'Location',
                slug: '/location',
                subsections: [],
            },
            {
                title: 'Médias',
                slug: '/media',
                subsections: [],
            },
            {
                title: 'Infos',
                slug: '/infos',
                subsections: [],
            },
        ]
    }
})
