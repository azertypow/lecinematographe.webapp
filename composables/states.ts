import type {IApiCmsPagesList} from "~/_utils/apiCms";

export const useMenuIsOpen = () => useState<boolean>('menuIsOpen', () => false)

export const usePlayerLink = () => useState<string | null>('playerLink', () => null)

export const usePagesData = () => useState<IApiCmsPagesList>('pagesData', () => {
    return {
        pages: [
            {
                title: 'Cycles',
                slug: '/cycles',
                subsections: [],
            },
            {
                title: 'Évènements',
                slug: '/evenements',
                subsections: [],
            },
            {
                title: 'Location',
                slug: '/location',
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
