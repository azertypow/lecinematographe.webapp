export function doesDateMatch(date: Date, dateList: string[]): boolean {
    const formattedDate = date.toISOString().split('T')[0]

    return dateList.includes(formattedDate)
}
