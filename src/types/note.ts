export namespace Note {
  export interface TodosResponse {
    todos: Todo[]
    total: number
    skip: number
    limit: number
  }

  export interface Todo {
    id: number
    todo: string
    completed: boolean
    userId: number
  }

  export interface Item {
    id: number
    checkbox: boolean
    name: string
    modelName: string
  }
}
