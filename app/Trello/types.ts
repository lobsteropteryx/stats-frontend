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