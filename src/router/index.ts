import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import WithoutFooterLayout from '@/layout/WithoutFooterLayout.vue'
import HomeView from '@/views/HomeView.vue'
import NotesListView from '@/views/NotesListView/index.vue'
import NotesListViewId from '@/views/NotesListView/id.vue'
import AddNoteView from '@/views/AddNoteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        layout: WithoutFooterLayout
      }
    },
    {
      path: '/notes',
      name: 'NotesList',
      component: NotesListView,
      meta: {
        layout: DefaultLayout
      }
    },
    {
      path: '/:id',
      name: 'NotesListId',
      component: NotesListViewId,
      meta: {
        layout: DefaultLayout
      }
    },
    {
      path: '/add',
      name: 'AddNote',
      component: AddNoteView,
      meta: {
        layout: WithoutFooterLayout
      }
    }
  ]
})

export default router
