export function getDatesRange(startDate: Date, range: number): Date[] {
    return Array.from({length: range}, (value, index) => {
        const incrementedDate = new Date()
        incrementedDate.setDate(startDate.getDate() + index)
        return incrementedDate
    })
}
