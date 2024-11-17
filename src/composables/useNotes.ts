import { ref } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { storeToRefs } from 'pinia'
import type { Note } from '@/types/note'

export function useNotes() {
  const isLoading = ref<boolean>(false)
  const error = ref<Error>()
  const store = useNotesStore()
  const { notes } = storeToRefs(store)

  async function getNotes() {
    isLoading.value = true
    try {
      const response = await fetch('https://dummyjson.com/todos?limit=10')
      if (response.ok) {
        const data: Note.TodosResponse = await response.json()
        notes.value = data.todos.map((note: Note.Todo, index: number) => {
          return {
            id: index,
            checkbox: index,
            name: note.todo,
            modelName: note.todo
          }
        })
      } else {
        throw new Error(String(response.status))
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e
      }
    } finally {
      isLoading.value = false
    }
  }

  if (!store.notes.length) {
    getNotes()
  }

  function addNote(name: string): void {
    notes.value.push({
      id: store.notes.length,
      checkbox: store.notes.length + 1,
      name: name,
      modelName: ''
    })
  }

  function deleteNote(id: number) {
    notes.value = notes.value.filter((note: any) => note.id !== id)
  }

  return {
    isLoading,
    error,
    addNote,
    deleteNote
  }
}
