export interface Action {
    date: string,
    data: Data
}

interface Data {
    listAfter: List
}

interface List {
    id: string
}