import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Note } from '@/types/note'

export const useNotesStore = defineStore('notes', () => {
  // const data = ref([])
  const notes = ref<Note.Item[]>([])

  // watch(data, () => {
  //   notes.value = (data.value as any)?.todos?.map((note: any, index: any) => {
  //     return {
  //       id: index,
  //       name: note.todo,
  //       model: note.todo
  //     }
  //   })
  // })

  return {
    notes
    // data
  }
})
