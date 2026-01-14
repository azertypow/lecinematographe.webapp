import type {IApiCmsPagesList} from "~/_utils/apiCms";

export const useMenuIsOpen = () => useState<boolean>('menuIsOpen', () => false)

export const useBarIsOpen = () => useState<boolean>('barIsOpen', () => true)

export const usePlayerLink = () => useState<string | null>('playerLink', () => null)

export const usePagesData = () => useState<IApiCmsPagesList>('pagesData', () => {
    return {
        pages: []    }
})

export const useListOfMessageByDates = () => useState<{
  "date": string,
  "description": string
}[]>('listOfMessageByDates', () => [])
