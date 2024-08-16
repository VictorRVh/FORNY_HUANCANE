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
        <button class="btn btn-primary">Buscar</button>
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
                  @click.prevent="verDocente(docente.dni)"
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
                      >Nombre</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="modificar('apellido_paterno', docente)"
                      >Apellido Paterno</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="modificar('apellido_materno', docente)"
                      >Apellido Materno</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="modificar('celular', docente)"
                      >Celular</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="modificar('correo', docente)"
                      >Correo</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="modificar('editar_todo', docente)"
                      >Editar Todo</a
                    >
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
    modificar(campo, docente) {
      // Implementar funcionalidad de modificación
    },
    eliminar(id) {
      // Implementar funcionalidad de eliminación
    },
    toggleDropdown(id, state) {
      this.showDropdown[id] = state;
    },
    modificar(dato, docente) {
      let modifyName = "";
      let valueData = "";

      switch (dato) {
        case "nombre":
          modifyName = "Nombre";
          valueData = docente.nombre;
          break;
        case "apellido_paterno":
          modifyName = "Apellido Paterno";
          valueData = docente.apellido_paterno;
          break;
        case "apellido_materno":
          modifyName = "Apellido Materno";
          valueData = docente.apellido_materno;
          break;
        case "celular":
          modifyName = "Celular";
          valueData = docente.celular;
          break;
        case "correo":
          modifyName = "Correo";
          valueData = docente.correo;
          break;
        case "editar_todo":
          // Aquí podrías hacer un modal que permita editar todos los campos
          this.editarTodo(docente);
          return;
      }

      Swal.fire({
        title: `Editar ${modifyName}`,
        input: "text",
        inputValue: valueData,
        showCancelButton: true,
        confirmButtonText: "Modificar",
        showLoaderOnConfirm: true,
        preConfirm: (nuevoValor) => {
          return this.actualizarDocente(docente.dni, { [dato]: nuevoValor });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `${modifyName} actualizado!`,
            icon: "success",
          });
        }
      });
    },

    actualizarDocente(dni, datosActualizados) {
      console.log(dni)
      return fetch(`http://127.0.0.1:8000/api/teacher/${dni}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosActualizados),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            // Actualiza los datos del docente en tu frontend
            Object.assign(this.docente, datosActualizados);
            console.log("actulizado")
          } else {
            throw new Error(data.message || "Error al actualizar");
          }
        })
        .catch((error) => {
          Swal.showValidationMessage(`Error: ${error}`);
        });
    },

    editarTodo(docente) {
      // Aquí puedes abrir un modal o similar para editar todos los campos
    },
    verDocente(dni) {
      fetch(`http://127.0.0.1:8000/api/teacher/${dni}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener los datos del docente");
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === 200) {
            const docente = data.teacher;
            Swal.fire({
              title: `Información de ${docente.nombre} ${docente.apellido_paterno} ${docente.apellido_materno}`,
              html: `<div class="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <table class="table table-bordered">
                        <tbody>
                          <tr>
                            <td ><strong>Nombre</strong></td>
                            <td>${docente.nombre} ${docente.apellido_paterno} ${
                docente.apellido_materno
              }</td>
                          </tr>
                          <tr>
                            <td><strong>DNI</strong></td>
                            <td>${docente.dni}</td>
                          </tr>
                          <tr>
                            <td><strong>Sexo</strong></td>
                            <td>${docente.sexo}</td>
                          </tr>
                          <tr>
                            <td><strong>Celular</strong></td>
                            <td>${docente.celular}</td>
                          </tr>
                          <tr>
                            <td><strong>Correo</strong></td>
                            <td>${docente.correo}</td>
                          </tr>
                          <tr>
                            <td class="w-30"><strong>Fecha de nacimiento</strong></td>
                            <td>${docente.fecha_nacimiento}</td>
                          </tr>
                          <tr>
                            <td><strong>Creado el</strong></td>
                            <td>${new Date(docente.created_at).toLocaleDateString()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              `,
              icon: "info",
              confirmButtonText: "Cerrar",
            });
          } else {
            throw new Error("Docente no encontrado");
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        });
    },
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
.btn_edit {
  display: flex;
}

.dropdown-menu {
  margin-top: 50px;
  margin-left: -50px;
}
</style>
