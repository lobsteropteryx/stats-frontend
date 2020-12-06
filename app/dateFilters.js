export const filterWorkItemByDate = (workItem, startDate, endDate) => {
    return workItem.completionDate !== null &&
        (!startDate || workItem.completionDate >= startDate) &&
        (!endDate || workItem.completionDate <= endDate)
}
