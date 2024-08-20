import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Inicio/interfaz.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    ///////////////////////
  /// OTRO URL PARA CEPRO
    ////////////////
    {
      path: '/Especialidad',
      name: 'Especialidad',
      component: () => import('../components/Especialidad/ListEspecialidad.vue')
    },
    {
      path: '/Especialidad/Add',
      name: 'EspecialidadAdd',
      component: () => import('../components/Especialidad/Nomina.vue')
    },
    {
      path: '/Matricula',
      name: 'Matricula',
      component: () => import('../components/Matricula/matricula.vue')
    },
    {
      path: '/Estudiante',
      name: 'Estudiante',
<<<<<<< HEAD
      component: () => import('../components/Estudiante/ListEstudiante.vue')
=======
      component: () => import('../components/Estudiante/ListaEstudiantes.vue')
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
    },
    {
      path: '/Docente',
      name: 'Docente',
      component: () => import('../components/Docente/ListDocente.vue')
    }
  ]
})

export default router
