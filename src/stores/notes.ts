import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Note } from '@/types/note'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note.Item[]>(JSON.parse(localStorage.getItem('notes') as string) || [])

  watch(
    notes,
    () => {
      localStorage.setItem('notes', JSON.stringify(notes.value))
    },
    { deep: true }
  )

  return {
    notes
  }
})
