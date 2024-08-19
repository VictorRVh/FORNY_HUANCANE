<template>
  <h2 class="text-primary">Estudiantes</h2>

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
        <button class="btn btn-primary">Buscar</button>
      </div>
      <div class="input-group mb-3 w-50"></div>
      <div class="input-group mb-3 w-25 d-flex">
        <button class="btn btn-primary" @click="toggleModal">Agregar</button>
        <!-- Modal para agregar estudiante usando el componente Registro -->
        <Registro v-if="modal.mostrarModal" @close-modal="toggleModal" />
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
              v-for="(estudiante, index) in estudiantes"
              :key="estudiante.id"
              v-show="filter(estudiante)"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ estudiante.nombre }}</td>
              <td class="text-center">
                {{ estudiante.apellido_paterno }} {{ estudiante.apellido_materno }}
              </td>
              <td class="text-center">{{ estudiante.dni }}</td>
              <td class="text-center">{{ estudiante.celular }}</td>

              <td class="text-center btn_edit">
                <a
                  href="#"
                  class="btn btn-outline-primary m-2"
                  @click.prevent="verEstudiante(estudiante.id)"
                >
                  <icono icon="eye" />
                </a>
                <a
                  href="#"
                  class="btn btn-outline-success m-2 dropdown-toggle"
                  @mouseenter="toggleDropdown(estudiante.id, true)"
                  @mouseleave="toggleDropdown(estudiante.id, false)"
                >
                  <icono icon="edit" />
                </a>
                <ul
                  class="dropdown-menu"
                  :class="{ show: showDropdown[estudiante.id] }"
                  @mouseenter="toggleDropdown(estudiante.id, true)"
                  @mouseleave="toggleDropdown(estudiante.id, false)"
                >
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="modificar('nombre', estudiante)"
                      >Nombre</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="modificar('apellido_paterno', estudiante)"
                      >Apellido Paterno</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="modificar('apellido_materno', estudiante)"
                      >Apellido Materno</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="modificar('celular', estudiante)"
                      >Celular</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="modificar('correo', estudiante)"
                      >Correo</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="modificar('editar_todo', estudiante)"
                      >Editar Todo</a
                    >
                  </li>
                </ul>

                <a
                  href="#"
                  class="btn btn-outline-danger m-2"
                  @click="eliminar(estudiante.id)"
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
import Registro from "./Registro.vue"; // Importa el componente del formulario de registro

export default {
  data() {
    return {
      filterField: "",
      showDropdown: {},
      estudiantes: [],
      modal: {
        mostrarModal: false,
      },
    };
  },
  created() {
    this.obtenerEstudiantes();
  },
  methods: {
    toggleModal() {
      this.modal.mostrarModal = !this.modal.mostrarModal;
      if (!this.modal.mostrarModal) {
        this.obtenerEstudiantes(); // Actualiza la lista de estudiantes después de cerrar el modal
      }
    },
    obtenerEstudiantes() {
      fetch("http://127.0.0.1:8000/api/students")
        .then((response) => response.json())
        .then((data) => {
          this.estudiantes = data.students;
        })
        .catch((error) => {
          console.error("Error al obtener los estudiantes:", error);
        });
    },
    filter(estudiante) {
      return estudiante.nombre.toLowerCase().includes(this.filterField.toLowerCase());
    },
    exportar() {
      // Implementar funcionalidad de exportar
    },
    modificar(campo, estudiante) {
      // Implementación del método para modificar campos de estudiante
    },
    actualizarEstudiante(id, datosActualizados) {
      // Implementación de la actualización de estudiante
    },
    editarTodo(estudiante) {
      // Implementa un modal o similar para editar todos los campos
    },
    verEstudiante(id) {
      // Implementación de la visualización del estudiante
    },
    eliminar(id) {
      // Implementación de la eliminación del estudiante
    },
    toggleDropdown(id, state) {
      this.showDropdown[id] = state;
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Asegúrate de que tenga un alto z-index para que esté por encima de otros elementos */
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

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
.btn_edit {
  display: flex;
}

.dropdown-menu {
  margin-top: 50px;
  margin-left: -50px;
}
</style>
