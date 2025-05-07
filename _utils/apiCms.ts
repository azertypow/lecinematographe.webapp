export interface IApiCmsPagesList {
    pages: IApiCmsPage[]
}

export interface IApiCmsPage {
    title: string
    slug: string
    subsections: string[]
    show_in_nav: 'true' | 'false'
}

export type KQL_Admin_response = {
    code: string
    result: any
    status: string
}

export async function KQL_Admin({ query, select }: { query: string; select: string[] }): Promise<KQL_Admin_response> {
    const api = "https://cms.lecinematographe.ch/api/query";
    const username = "api";
    const password = "empty_password";

    const authHeader = "Basic " + btoa(`${username}:${password}`);

    const headers = {
        Authorization: authHeader,
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    const response = await fetch(api, {
        method: "post",
        body: JSON.stringify({
            query,
            select,
        }),
        headers,
    });

    return await response.json() satisfies KQL_Admin_response[]
}


export type Api_ContentBlock = {
    type: "textWithTitle"
    id: string
    isHidden: boolean
    content: {
        text: string
    }
} | {
    type: "location"
    id: string
    isHidden: boolean
    content: any[]
} | {
    type: "film-list"
    id: string
    isHidden: boolean
    content: {
        category: 'kids' | 'all' | 'senior'
    }
}

export type FilmList = {
    id: string; // UUID
    type: "film-list";
    category: "junior" | "senior";
    isHidden: boolean;
    content: Record<string, unknown>; // ou {} si toujours vide
}
