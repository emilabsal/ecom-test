import { ref, computed } from 'vue'

export function useApi() {
  const data = ref([])
  const isLoading = ref<boolean>(false)
  const error = ref<Error>()
  const notes = computed(() =>
    (data.value as any)?.todos?.map((note: any, index: any) => {
      return {
        id: index,
        name: note.todo,
      }
    }),
  )

  async function getData(): Promise<void> {
    isLoading.value = true
    try {
      const response = await fetch('https://dummyjson.com/todos?limit=10')
      if (response.ok) {
        data.value = await response.json()
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e
      }
    } finally {
      isLoading.value = false
    }
  }

  getData()

  return {
    notes,
    isLoading,
    error,
  }
}
