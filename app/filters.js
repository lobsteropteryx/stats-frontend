import { setCards } from "./Filter/Local/localFilterSlice"

export const filterWorkItemByDate = (workItem, startDateString, endDateString) => {
    const startDate = Date.parse(startDateString);
    const endDate = Date.parse(endDateString);
    const completionDate = Date.parse(workItem.completionDate);
    return workItem.completionDate !== null &&
        (!startDate || completionDate >= startDate) &&
        (!endDate || completionDate <= endDate)
};

export const filterCardByLabel = (card, selectedLabels) => {
    return selectedLabels
        .map(label => label.id)
        .every(label => card.labels.map(label => label.id).includes(label));
};