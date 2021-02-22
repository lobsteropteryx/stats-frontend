export interface Card {
    id: string,
    name: string,
    actions: Array<Action>
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