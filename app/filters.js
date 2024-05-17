import { setCards } from "./Filter/Local/localFilterSlice"

export const filterWorkItemByDate = (workItem, startDate, endDate) => {
    return workItem.completionDate !== null &&
        (!startDate || workItem.completionDate >= startDate) &&
        (!endDate || workItem.completionDate <= endDate)
};

export const filterCardByLabel = (card, selectedLabels) => {
    return selectedLabels
        .map(label => label.id)
        .every(label => card.labels.map(label => label.id).includes(label));
};