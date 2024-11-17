import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useNotesStore = defineStore('notes', () => {
  const data = ref([])
  const notes = ref([])

  watch(data, () => {
    notes.value = (data.value as any)?.todos?.map((note: any, index: any) => {
      return {
        id: index,
        name: note.todo,
        model: note.todo
      }
    })
  })

  return {
    notes,
    data
  }
})
