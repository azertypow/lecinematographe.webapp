import {LECINEMATOGRAPHE_ENGINE_TOKEN} from "~/_utils/LECINEMATOGRAPHE_ENGINE_TOKEN";
import type {ApiTicketack_screening} from "~/_utils/apiTicketack";
import {apiGetListOfFilmByDate} from "~/_utils/apiTicket";

const ticketackApiBaseUrl = 'https://lecinematographe-engine.ticketack.com/api'


export async function ticketackApi_screenings(queries: {
    query: 'start_at_gte' | 'stop_at_lte' | 'sections_ids'
    value: string
}[]) {

    const queryString = queries
        .map(option => `${option.query}=${encodeURIComponent(option.value)}`)
        .join('&')

    const url = `${ticketackApiBaseUrl}/screenings?${queryString}`;

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-api-key': LECINEMATOGRAPHE_ENGINE_TOKEN,
        },
    };

    try {
        const response = await fetch(url, options);
        return await response.json() as ApiTicketack_screening[]
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function ticketackApi_screening_byID(UUID: string) {

    const url = `${ticketackApiBaseUrl}/screenings/${UUID}`;

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-api-key': LECINEMATOGRAPHE_ENGINE_TOKEN,
        },
    };

    try {
        const response = await fetch(url, options);
        return await response.json() as ApiTicketack_screening
    } catch (error) {
        console.error(error)
        return null
    }
}


export async function apiGetSeancesOfFilm(filmID: string): Promise<ApiTicketack_screening[]> {
    const currentDateFrom0Hour = new Date()
    currentDateFrom0Hour.setHours(0)
    currentDateFrom0Hour.setMinutes(0)

    return (await apiGetListOfFilmByDate(currentDateFrom0Hour, 90)).filter((value, index, array) => {
        return value.films[0]._id === filmID
    })
}
