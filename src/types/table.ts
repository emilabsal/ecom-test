export namespace Table {
  export interface Props {
    columns: Column[]
    columnsScheme: string[]
    rows: any[]
  }

  interface Column {
    id: string
    label?: string
  }
}
