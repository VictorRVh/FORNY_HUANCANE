<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './views/Header.vue'

import Nav from './views/NavViews.vue'
</script>

<template>
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

</template>

<style scoped>
/* Estilos para el componente */
.contenido{
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
