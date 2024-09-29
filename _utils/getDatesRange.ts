export function getDatesRange(startDate: Date, range: number): Date[] {
    return Array.from({length: range}, (value, index) => {
        const incrementedDate = new Date()
        incrementedDate.setHours(2)
        incrementedDate.setMinutes(0)
        incrementedDate.setSeconds(0)
        incrementedDate.setDate(startDate.getDate() + index)
        return incrementedDate
    })
}
