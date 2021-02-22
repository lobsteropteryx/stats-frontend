export interface Card {
    id: string,
    name: string,
    labels: Array<Label>,
    actions: Array<Action>
}

export interface Label {
    id: string,
    name: string,
    color: string
}

export interface Action {
    date: string,
    data: Data
}

interface Data {
    listBefore: List
    listAfter: List
}

interface List {
    id: string,
    name: string
}