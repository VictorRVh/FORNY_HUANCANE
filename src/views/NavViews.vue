<script>
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      showDropdown: {
        CAMPUS: false,
        FACULTAD: false,
        CARRERA: false,
        PROGRAMA_ACADEMICO: false,
        MAESTRIA: false,
      },
    };
  },
  computed: {
    route() {
      return useRoute();
    },
  },
  methods: {
    isActive(path) {
      return this.route.path === path;
    },
    toggleDropdown(menuItem, state) {
      this.showDropdown[menuItem] = state;
    },
  },
};
</script>

<template>
  <div class="nav_left ">
    
    <ul class="nav pt-3">
      <li
        class="nav-item"
        :class="{ active: isActive('/Especialidad') }"
        @mouseover="toggleDropdown('Especialidad', true)"
        @mouseleave="toggleDropdown('Especialidad', false)"
      >
        <router-link class="nav-link nav_item text-primary" to="/Especialidad">
          <icono icon="chalkboard" class="h4" />
          <p>ESPECIALIDAD</p>
        </router-link>
        <ul class="dropdown-menu nav_aside bg-primary" v-show="showDropdown.CAMPUS">
          <div class="dir-nav bg-primary"></div>
          <li><a class="dropdown-item-aside" href="#">Nombre</a></li>
          <li><a class="dropdown-item-aside" href="#">Abreviatura</a></li>
          <li><a class="dropdown-item-aside" href="#">Código</a></li>
        </ul>
      </li>
      <li
        class="nav-item"
        :class="{ active: isActive('/Docente') }"
        @mouseover="toggleDropdown('Docente', true)"
        @mouseleave="toggleDropdown('Docente', false)"
      >
        <router-link class="nav-link nav_item text-primary" to="/Docente">
          <icono icon="bookmark" class="h4" />
          <p>DOCENTE</p>
        </router-link>
        <ul class="dropdown-menu nav_aside bg-primary" v-show="showDropdown.FACULTAD">
          <div class="dir-nav bg-primary"></div>
          <li><a class="dropdown-item-aside" href="#">Nombre</a></li>
          <li><a class="dropdown-item-aside" href="#">Abreviatura</a></li>
          <li><a class="dropdown-item-aside" href="#">Código</a></li>
        </ul>
      </li>
      <li
        class="nav-item"
        :class="{ active: isActive('/Estudiante') }"
        @mouseover="toggleDropdown('Estudiante', true)"
        @mouseleave="toggleDropdown('Estudiante', false)"
      >
        <router-link class="nav-link nav_item text-primary" to="/Estudiante">
          <icono icon="user-tie" class="h4" />
          <p>ESTUDIANTE</p>
        </router-link>
        <ul class="dropdown-menu nav_aside bg-primary" v-show="showDropdown.CARRERA">
          <div class="dir-nav bg-primary"></div>
          <li><a class="dropdown-item-aside" href="#">Nombre</a></li>
          <li><a class="dropdown-item-aside" href="#">Abreviatura</a></li>
          <li><a class="dropdown-item-aside" href="#">Código</a></li>
        </ul>
      </li>
      <li
        class="nav-item"
        :class="{ active: isActive('/Matricula') }"
        @mouseover="toggleDropdown('Matricula', true)"
        @mouseleave="toggleDropdown('Matricula', false)"
      >
        <router-link class="nav-link nav_item text-primary" to="/Matricula">
          <icono icon="book" class="h4" />
          <p>MATRÍCULA</p>
        </router-link>
        <ul class="dropdown-menu nav_aside bg-primary"
          v-show="showDropdown.PROGRAMA_ACADEMICO"
        >
          <div class="dir-nav bg-primary"></div>
          <li><a class="dropdown-item-aside" href="#">Nombre</a></li>
          <li><a class="dropdown-item-aside" href="#">Abreviatura</a></li>
          <li><a class="dropdown-item-aside" href="#">Código</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.nav_left {
  width: 150px;
  height: 100%;
  border-right:2px solid #92173344;

}

.contenido_right {
  height: 100%;
}

.nav_item {
  color: #fff;
  width: 150px;
  text-align: center;
}

.nav_item > p {
  font-size: 12px;
  font-family: sans-serif;
}

.nav_item:hover {
  background: #92173322;
  color: #fff;
}

.nav-item.active .nav-link {
  background-color: #92173322;
  color: #fff;
}

.nav_aside {
  padding: 20px 30px;
  width: 200px;
  position: absolute;
  color: white;
  display: none;
  margin-left: 160px;
  margin-top: -87px;
}

.nav-item:hover .nav_aside {
  display: block;
}

.dir-nav {
  width: 28px;
  height: 28px;
  position: absolute;
  left: -8px;
  top: 15px;
  border-radius: 6px;
  transform: rotate(50deg);
}

.dropdown-item-aside {
  color: white;
}

.nav_aside li a {
  color: #ccc;
  text-decoration: none;
  font-family: monospace;
  font-size: 14px;
}

.nav_aside li a:hover {
  color: #fff;
}

.dropdown-item:hover {
  background-color: blue !important;
}
</style>
