<script setup>
import { RouterLink, RouterView, useRouter} from "vue-router";
import { computed } from 'vue';
import { useUserStore } from '@/stores/userStore';

import Header from "./views/Header.vue";

import Nav from "./views/NavViews.vue";



const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.isAuthenticated);

</script>

<template>
  <div v-if="isAuthenticated" >
    <Header />
    <div class="d-flex mb-3 contenido">
      <!-- Barra de navegación -->
      <aside class="nav-left">
        <Nav />
      </aside>

      <!-- Contenido principal -->
      <main class="flex-grow-1">
        <router-view />
      </main>
    </div>
  </div>

  <router-view v-else/>

</template>

<style scoped>
/* Estilos para el componente */
.contenido {
  height: 91vh;
}
.nav-left {
  /* Estilos para la barra de navegación en el lado izquierdo */
  width: 150px; /* Ancho de la barra de navegación */
}

main {
  /* Estilos para el contenido principal */
  padding: 20px; /* Espacio alrededor del contenido */
}
</style>
