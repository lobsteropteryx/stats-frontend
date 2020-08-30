const filterActionByDate = (action, startDate, endDate) => {
    return (!startDate || action.completionDate >= startDate) &&
        (!endDate || action.completionDate <= endDate)
}

export default filterActionByDate;