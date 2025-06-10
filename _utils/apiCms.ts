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

export async function KQL_Admin({ query, select }: { query: string; select: {[key: string]: string | boolean} }): Promise<KQL_Admin_response> {
    const api = "https://cms.lecinematographe.ch/api/query";
    const username = "api";
    const password = "empty_password";

    const authHeader = "Basic " + btoa(`${username}:${password}`);

    const headers = {
        // Authorization: authHeader,
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


export type Api_blocks = {
    content: Api_blocks_content,
    "img_srcset": {
        "tiny":     string | null
        "small":    string | null
        "reg":      string | null
        "large":    string | null
        "xxl":      string | null
    }
}

export type Api_blocks_content = {
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
} | {
    type: "image"
    id: string,
    isHidden: boolean,
    content: {
        "image": string[]
    },
}

export type FilmList = {
    id: string; // UUID
    type: "film-list";
    category: "junior" | "senior";
    isHidden: boolean;
    content: Record<string, unknown>; // ou {} si toujours vide
}
