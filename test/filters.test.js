import { filterWorkItemByDate, filterCardByLabel } from "../app/filters";

describe('Filtering actions by date', () => {
    it('Returns true if startDate is null and end date is less than completion date', () => {
        const action = {
            completionDate: new Date(1, 1, 2020)
        };
        const startDate = null;
        const endDate = new Date(1, 2, 2020);

        expect(filterWorkItemByDate(action, startDate, endDate)).toBe(true);
    });

    it('Returns true if startDate is greater than completion date and end date is less than completion date', () => {
        const action = {
            completionDate: new Date(1, 2, 2020)
        };
        const startDate = new Date(1, 1, 2020);
        const endDate = new Date(1, 3, 2020);

        expect(filterWorkItemByDate(action, startDate, endDate)).toBe(true);
    });

    it('Returns true if endDate is null and start date is less than completion date', () => {
        const action = {
            completionDate: new Date(1, 2, 2020)
        };
        const startDate = new Date(1, 1, 2020);
        const endDate = null;

        expect(filterWorkItemByDate(action, startDate, endDate)).toBe(true);
    });

    it('Returns false if startDate is less than completion date and end date is greater than completion date', () => {
        const action = {
            completionDate: new Date(1, 2, 2020)
        };
        const startDate = new Date(1, 3, 2020);
        const endDate = new Date(1, 1, 2020);

        expect(filterWorkItemByDate(action, startDate, endDate)).toBe(false);
    });

    it('Returns false if completion date is null', () => {
        const action = {
            completionDate: null 
        };
        const startDate = null;
        const endDate = null;

        expect(filterWorkItemByDate(action, startDate, endDate)).toBe(false);
    });
});

describe('Filtering actions by label', () => {
    it('Returns true if there are no selected labels', () => {
        const card = {
            id: '1',
            name: 'myCard',
            labels: [],
            actions: []
        };
        const selectedLabels = [];

        expect(filterCardByLabel(card, selectedLabels)).toBe(true);
    });

    it('Returns true if the card includes all the selected labels', () => {
        const card = {
            id: '1',
            name: 'myCard',
            labels: [{
                id: '1',
                name: 'myLabel',
                color: 'red'
            }, {
                id: '2',
                name: 'myOtherLabel',
                color: 'blue'
            }],
            actions: []
        };
        const selectedLabels = [{
            id: '1',
            name: 'myLabel',
            color: 'red'
        }];

        expect(filterCardByLabel(card, selectedLabels)).toBe(true);
    });

    it('Returns false if the card includes only some of the selected labels', () => {
        const card = {
            id: '1',
            name: 'myCard',
            labels: [{
                id: '1',
                name: 'myLabel',
                color: 'red'
            }],
            actions: []
        };
        const selectedLabels = [{
                id: '1',
                name: 'myLabel',
                color: 'red'
            }, {
                id: '2',
                name: 'myOtherLabel',
                color: 'blue'
        }];

        expect(filterCardByLabel(card, selectedLabels)).toBe(false);
    });

    it('Returns false if the card does not have the selected label', () => {
        const card = {
            id: '1',
            name: 'myCard',
            labels: [],
            actions: []
        };
        const selectedLabels = [{
            id: '1',
            name: 'myLabel',
            color: 'red'
        }];

        expect(filterCardByLabel(card, selectedLabels)).toBe(false);
    });
})