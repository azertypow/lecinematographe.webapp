export async function gapiGetFilmList(): Promise<IFilmListResponse> {
    const myHeaders = new Headers()
    myHeaders.append("Accept", "application/json")
    myHeaders.append("Accept-Language", "fr")

    const requestOptions: RequestInit = {
        method:     'GET',
        headers:    myHeaders,
        redirect:   'manual'
    }

    return fetch("api/films/list/city/1", requestOptions)
    // return fetch("https://wkheops.cinemotion.ch/wkh/ajax/WwtLstFilm2.php?WwtVille=1&WwtTrie=4&WwtIsActu=1", requestOptions)
        .then(response => response.json())
        .then(result => result as IFilmListResponse)
        .catch(error => ({error: error} as IFilmListResponse))
}


export interface ITicketFilm {
    id_film: number
    id_ctr: number
    tx_titre_lng: string
    tx_titre_ori: string
    tx_comment: string
    tx_duree: string
    tx_age: string
    ur_age: string
    tx_pays: string
    tx_annee: string
    tx_realisateur: string
    tx_acteur: string
    tx_distributeur: string
    ur_distributeur: string
    nb_note: number
    ur_vignette: string
    ur_affiche: string
    id_vision: number
    da_depart: string
}

export interface IFilmListResponse {
    filmlist?: ITicketFilm[]
    error?: string
}
