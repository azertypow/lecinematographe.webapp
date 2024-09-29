import type {ApiTicketack_Film} from "~/_utils/apiTicketack";
import {HttpProxy} from "vite";
import type {_AsyncData, AsyncDataRequestStatus} from "#app/composables/asyncData";
import {FetchError} from "ofetch";

export async function fetchFromTicketAPI<T>(endPoint: string): Promise<T> {
    const myHeaders = new Headers()
    myHeaders.append("Accept", "application/json")
    myHeaders.append("Accept-Language", "fr")

    const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    }

    try {
        const response = await fetch(`https://wkheops.lecinematographe.ch/wkh${endPoint}`, requestOptions)
        return await response.json() as T;
    } catch (error) {
        return ({error: error} as T);
    }
}

export async function apiGetFilmList() {
    return fetchFromTicketAPI<IFilmListResponse>('/ajax/WwtLstFilm.php?WwtTrie=4&WwtLimi=90')

}

export async function apiGetFilmById(filmId: number) {
    return fetchFromTicketAPI<IFilmListResponse>(`/ajax/WwtLstFilm.php?WwtFilm=${filmId}`)
    //https://wkheops.lecinematographe.ch/wkh/ajax/WwtLstFilm.php?WwtFilm=5
    //https://wkheops.lecinematographe.ch/cgi-bin/wwtRest.fcgi?action=filmlist&idfilm=3
}

export async function apiGetUrlOfFilm(filmId: number) {
    return fetchFromTicketAPI<any>(`/ajax/WwtLstUrl.php?WwtFilm=${filmId}`)
}

export async function apiGetSeancesOfFilm(filmID: number) {
    return fetchFromTicketAPI<ISeancesOfFilm>(`/ws/WwtLstSeanceAct.php?WwtFilm=${filmID}&WwtLimi=30`)
}

export async function apiGetListOfFilmByDate(date: Date): Promise<ApiTicketack_Film[]> {

    const dateAfter = new Date(date)
    dateAfter.setDate(dateAfter.getDate() + 1)

    const url = `/api/getFilms?stop_at_gte=${date.toISOString()}&stop_at_lte=${dateAfter.toISOString()}`

    const getFilmsResponse = await fetch(url)

    console.log(getFilmsResponse)

    const filmResponseData: ApiTicketack_Film[]     = await getFilmsResponse.json()

    console.log(getFilmsResponse)

    return filmResponseData
}


export interface ISeancesOfFilm {
    seance: ISeance[]
}

export interface ISeance {
    "id_seance":               number
    "id_horaire":              number
    "id_film":                 number
    "id_ctr":                  number
    "id_ville":                number
    "id_site":                 number
    "id_salle":                number
    "id_date":                 string //"2024-03-08"
    "sean_dep":                string //"20:15"
    "id_heure":                number
    "id_version":              number
    "id_typseance":            number
    "is_so":                   number //"is_so": 1,
    "is_ap":                   number //"is_ap": 0,
    "is_3d":                   number //"is_3d": 0,
    "is_hfr":                  number //"is_hfr": 0,
    "is_resa":                 number //"is_resa": 0,
    "is_vente":                number //"is_vente": 0,
    "is_web":                  number //"is_web": 1,
    "tx_age":                  string
    "tx_titre_lng":            string
    "tx_titre_ori":            string
    "tx_titre_ver":            string
    "tx_billet":               string
    "tx_ville":                string
    "tx_site":                 string
    "tx_salle":                string
    "tx_date":                 string
    "tx_heure":                string
    "tx_vers":                 string
    "tx_vers_abr":             string
    "tx_typseance":            string
    "tx_seance":               string
    "ur_vignette":             string
    "ur_affiche":              string
    "ur_isap":                 string
    "ur_is3d":                 string
    "ur_ishfr":                string
    "ur_complet":              string
    "va_place":                string
    "va_alerte":               string
    "va_spect":                number
    "va_solde":                string
    "va_etat":                 number
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
    id_vision: 21 | 11 | 1 | 2 | 12 | 3 | 99 //11 avant premiere, 21 event, 1 premiere suire, 2 premiere, 3 2e vision, 12 cycle, 99 autre
    da_depart?: string
    ur_cover?: string
    ur_images?: string[]
    da_fin?: string
    tx_vers?: string
    tx_vers_abr?: string
    tx_vers_lng?: string
}

export interface IFilmListResponse {
    filmlist?: ITicketFilm[]
    error?: string
}
