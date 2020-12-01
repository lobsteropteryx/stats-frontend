export const filterActionByDate = (action, startDate, endDate) => {
    return action.completionDate !== null &&
        (!startDate || action.completionDate >= startDate) &&
        (!endDate || action.completionDate <= endDate)
}
