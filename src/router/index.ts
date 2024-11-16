import { createRouter, createWebHistory } from 'vue-router'
import NotesListView from '@/views/NotesListView/index.vue'
import NotesListViewId from '@/views/NotesListView/id.vue'
import DefaultLayout from '@/layout/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'NotesList',
      component: NotesListView,
      meta: {
        layout: DefaultLayout,
      },
    },
    {
      path: '/:id',
      name: 'NotesListId',
      component: NotesListViewId,
      meta: {
        layout: DefaultLayout,
      },
    },
  ],
})

export default router
