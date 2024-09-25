
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)

    const url = 'https://lecinematographe-engine.ticketack.com/api/screenings';
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-api-key': config.lecinematographeEngine as string,
        },
    };

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        return error
    }
})
