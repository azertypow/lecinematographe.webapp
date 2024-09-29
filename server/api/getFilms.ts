
export default defineEventHandler(async (event) => {

    /*
    start_at_lte: Filter on screenings starting before this date (inclusive)
    start_at_gte: Filter on screenings starting after this date (inclusive)
    stop_at_lte: Filter on screenings finishing before this date (inclusive)
    stop_at_gte: Filter on screenings finishing after this date (inclusive)
     */


    const dateQueryStart = getQuery(event).stop_at_gte
    const dateQueryEnd = getQuery(event).stop_at_lte

    const config = useRuntimeConfig(event)

    const url = `https://lecinematographe-engine.ticketack.com/api/screenings?start_at_gte=${dateQueryStart}&stop_at_lte=${dateQueryEnd}`;

    console.log(url)

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-api-key': config.lecinematographeEngineToken as string,
        },
    };

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        return error
    }
})
