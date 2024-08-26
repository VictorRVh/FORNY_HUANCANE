import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Inicio/interfaz.vue'
import { useUserStore } from '@/stores/userStore'; // Importa el store de Pinia
import { ref } from 'vue';

const isAuthenticated = ref(false); // Ejemplo sencillo



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true } // Requiere autenticación
    },

    {
      path: '/',
      name: 'login',
      component: () => import("../views/Login.vue")
    },

    ///////////////////////
    /// OTRO URL PARA CEPRO
    ////////////////
    {
      path: '/Especialidad',
      name: 'Especialidad',
      component: () => import('../components/Especialidad/ListEspecialidad.vue'),
      meta: { requiresAuth: true } // Requiere autenticación
    },
    {
      path: '/Especialidad/Add',
      name: 'EspecialidadAdd',
      component: () => import('../components/Especialidad/Nomina.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/Matricula',
      name: 'Matricula',
      component: () => import('../components/Matricula/matricula.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/Estudiante',
      name: 'Estudiante',
      component: () => import('../components/Estudiante/ListEstudiante.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/Docente',
      name: 'Docente',
      component: () => import('../components/Docente/ListDocente.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore(); // Obtén el store de Pinia
  const isAuthenticated = userStore.isAuthenticated; // Usa el estado de autenticación del store
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log("Redirigiendo a login, estado de autenticación:", isAuthenticated);
    next({ name: 'login' });
  } else {
    next();
    console.log("Acceso permitido, estado de autenticación:", isAuthenticated);
  }
});



export default router
