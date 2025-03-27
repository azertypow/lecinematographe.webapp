import type {ApiTicketack_screening} from "~/_utils/apiTicketack";
import {ticketackApi_screenings} from "~/_utils/ticketackFetch";
import LECINEMATOGRAPHE_API_IDS from "~/_utils/LECINEMATOGRAPHE_API_IDS";

export async function apiGetFilmList(): Promise<ApiTicketack_screening[]> {

    const currentDateFrom0Hour = new Date()
    currentDateFrom0Hour.setHours(0)
    currentDateFrom0Hour.setMinutes(0)

    return (await apiGetListOfFilmByDate(currentDateFrom0Hour, 90)).filter((value, index, array) => {
        return index === array.findIndex((item) => item.title.fr.toLowerCase() === value.title.fr.toLowerCase())
    })
}

export async function apiGetListOfFilmByDate(date: Date, duration = 1): Promise<ApiTicketack_screening[]> {

    const dateAfter = new Date(date)
    dateAfter.setDate(dateAfter.getDate() + duration)

    const getFilmsResponse = await ticketackApi_screenings([
        {
            query: 'start_at_gte',
            value: date.toISOString()
        },
        {
            query: 'stop_at_lte',
            value: dateAfter.toISOString()
        }
    ])

    return (getFilmsResponse as ApiTicketack_screening[]).filter(filmByDate => !filmByDate.sections.some(section => section._id === LECINEMATOGRAPHE_API_IDS))
}

export async function apiGetListOfScreeningByDate_filterByTag_event(date: Date, duration= 1): Promise<ApiTicketack_screening[]> {

    const dateAfter = new Date(date)
    dateAfter.setDate(dateAfter.getDate() + duration)

    const getFilmsResponse = await ticketackApi_screenings([
        {
            query: 'start_at_gte',
            value: date.toISOString()
        },
        {
            query: 'stop_at_lte',
            value: dateAfter.toISOString()
        },
        {
            query: 'sections_ids',
            value: '47958d1d-272f-4106-8dd5-eff93f45d8f0'
        }
    ])


    return getFilmsResponse.filter(value => value.films[0]?._id !== '0671a85e-1c5a-438d-bb8f-500139b38cc6')
}
