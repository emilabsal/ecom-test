import type { Note } from './note'

export namespace Table {
  export interface Props {
    columns: Column[]
    columnsScheme: string[]
    rows: Note.Item[]
  }

  export interface Column {
    id: string
    label?: string
    position?: Position
  }

  type Position = 'left' | 'center' | 'right'
}
