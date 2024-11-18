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
      const response = await fetch('https://dummyjson.com/todos?limit=20')
      if (response.ok) {
        const data: Note.TodosResponse = await response.json()
        notes.value = data.todos.map((note: Note.Todo, index: number) => {
          return {
            id: index,
            checkbox: false,
            name: note.todo,
            modelName: note.todo
          }
        })
        localStorage.setItem('notes', JSON.stringify(notes.value))
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

  function addNote(name: string, checkbox: boolean): void {
    notes.value.push({
      id: Math.max(...store.notes.map((note) => note.id)) + 1,
      checkbox: checkbox,
      name: name,
      modelName: name
    })
  }

  function deleteNote(id: number) {
    notes.value = notes.value.filter((note: Note.Item) => note.id !== id)
  }

  return {
    isLoading,
    error,
    addNote,
    deleteNote
  }
}
