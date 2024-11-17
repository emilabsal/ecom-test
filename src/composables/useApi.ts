import { ref, computed } from 'vue'
import { useNotesStore } from '@/stores/notes'

export function useApi() {
  const isLoading = ref<boolean>(false)
  const error = ref<Error>()
  const store = useNotesStore()

  async function getData(): Promise<void> {
    isLoading.value = true
    try {
      const response = await fetch('https://dummyjson.com/todos?limit=10')
      if (response.ok) {
        store.data = await response.json()
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
    getData()
  }

  return {
    isLoading,
    error
  }
}
