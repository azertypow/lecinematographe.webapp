export interface IApiCmsPagesList {
    pages: IApiCmsPage[]
}

export interface IApiCmsPage {
    title: string
    slug: string
    subsections: string[]
}
