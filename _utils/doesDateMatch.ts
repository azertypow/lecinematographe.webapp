export function doesDateMatch(date: Date, dateList: string[]): boolean {
    const formattedDate = date.toISOString().split('T')[0]

    const formattedDateList = dateList.map(date => {
        return new Date(date).toISOString().split('T')[0]
    })

    return formattedDateList.includes(formattedDate)
}
