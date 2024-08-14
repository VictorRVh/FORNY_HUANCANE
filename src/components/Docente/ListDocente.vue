<template>
  <h2 class="text-primary">Docente</h2>

  <div class="table-responsive overflow-hidden mt-4">
    <div class="d-flex justify-content-between align-items-center">
      <div class="input-group custom-input-group w-25">
        <input
          type="text"
          class="form-control p-2"
          id="search"
          v-model="filterField"
          placeholder="Buscar"
        />
        <button class="btn btn-success">Buscar</button>
      </div>
      <div class="input-group mb-3 w-50"></div>
      <div class="input-group mb-3 w-25 d-flex">
        <button class="btn btn-primary" @click="openModal">Agregar</button>
        <Modal :showModal="internalShowModal" @close-modal="closeModal" />
        <button class="btn btn-primary ml-5" @click="exportar">
          <icono icon="download" />
        </button>
      </div>
    </div>

    <div class="table-responsive overflow-hidden mt-3">
      <div class="overflow-auto custom-table-wrapper">
        <table class="table custom-table table-hover align-middle">
          <thead>
            <tr>
              <th class="text-center sticky-header">N°</th>
              <th class="text-center sticky-header">Nombre</th>
              <th class="text-center sticky-header">Apellido</th>
              <th class="text-center sticky-header">Dni</th>
              <th class="text-center sticky-header">Celular</th>
              <th class="text-center sticky-header">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(docente, index) in docentes"
              :key="docente.id"
              v-show="filter(docente)"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ docente.nombre }}</td>
              <td class="text-center">
                {{ docente.apellido_paterno }} {{ docente.apellido_materno }}
              </td>
              <td class="text-center">{{ docente.dni }}</td>
              <td class="text-center">{{ docente.celular }}</td>

              <td class="text-center btn_edit">
                <a
                  href="#"
                  class="btn btn-outline-primary m-2"
                  @click.prevent="verMas(docente)"
                >
                  <icono icon="eye" />
                </a>
                <a
                  href="#"
                  class="btn btn-outline-success m-2 dropdown-toggle"
                  @mouseenter="toggleDropdown(docente.id, true)"
                  @mouseleave="toggleDropdown(docente.id, false)"
                >
                  <icono icon="edit" />
                </a>
                <ul
                  class="dropdown-menu"
                  :class="{ show: showDropdown[docente.id] }"
                  @mouseenter="toggleDropdown(docente.id, true)"
                  @mouseleave="toggleDropdown(docente.id, false)"
                >
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="modificar('nombre', docente)"
                    >
                      Nombre
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="modificar('especialidad', docente)"
                    >
                      Especialidad
                    </a>
                  </li>
                </ul>
                <a
                  href="#"
                  class="btn btn-outline-danger m-2"
                  @click="eliminar(docente.id)"
                >
                  <icono icon="minus-circle" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Modal from "./Modal.vue";

export default {
  data() {
    return {
      filterField: "",
      internalShowModal: false, // Renombrado
      showDropdown: {},
      docentes: [],
      docentesFiltrados: [],
    };
  },

  created() {
    this.obtenerDocentes();
  },
  components: {
    Modal,
  },
  methods: {
    obtenerDocentes() {
      fetch("http://127.0.0.1:8000/api/teacher")
        .then((response) => response.json())
        .then((data) => {
          this.docentes = data.teachers; // Accede al array de docentes en la respuesta
          this.docentesFiltrados = this.docentes;
        })
        .catch((error) => {
          console.error("Error al obtener los docentes:", error);
        });
    },
    filter(docente) {
      return docente.nombre.toLowerCase().includes(this.filterField.toLowerCase());
    },
    openModal() {
      this.internalShowModal = true;
    },
    closeModal() {
      this.internalShowModal = false;
      this.obtenerDocentes();
    },
    exportar() {
      // Implementar funcionalidad de exportar
    },
    verMas(docente) {
      // Implementar funcionalidad para ver más detalles del docente
    },
    modificar(campo, docente) {
      // Implementar funcionalidad de modificación
    },
    eliminar(id) {
      // Implementar funcionalidad de eliminación
    },
    toggleDropdown(id, state) {
      this.showDropdown[id] = state;
    }

  },
};
</script>

<style scoped>
.custom-table-wrapper {
  max-height: 400px;
}

.sticky-header {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
}

.btn_edit a {
  cursor: pointer;
}
</style>
