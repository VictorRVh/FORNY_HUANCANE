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
        <Modal
          :key="docenteSeleccionado"
          :showModal="showModal"
          :editMode="editMode"
          :docenteToEdit="docenteSeleccionado"
          @close-modal="closeModal"
          @docenteActualizado="obtenerDocentes"
        />

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
                    <a class="dropdown-item" href="#" @click="modificarAll(docente)"
                      >Editar Todo</a
                    >
                  </li>
                </ul>

                <a
                  href="#"
                  class="btn btn-outline-danger m-2"
<<<<<<< HEAD
                  @click="showDeleteConfirmation(docente.dni)"
=======
                  @click="eliminar(docente.dni)"
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
                >
                  <icono icon="trash" />
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
<<<<<<< HEAD
      showModal: false, // Renombrado
=======
      internalShowModal: false,
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
      showDropdown: {},
      docentes: [],
      editMode: false,
      docentesFiltrados: [],
      docenteSeleccionado: null, // Agregado para almacenar el docente seleccionado
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
          this.docentes = data.teachers;
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
      this.editMode = false; // Modo de agregar
      this.docenteSeleccionado = null; // Limpia los datos
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.obtenerDocentes();
    },
    exportar() {
      // Implementar funcionalidad de exportar
    },
    validarTextoSinCaracteresEspeciales(texto) {
      const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s]*$/; // Solo permite letras, números y espacios
      return regex.test(texto);
    },
    modificar(campo, docente) {
<<<<<<< HEAD
      const campoMap = {
        nombre: "Nombre",
        apellido_paterno: "Apellido Paterno",
        apellido_materno: "Apellido Materno",
        celular: "Celular",
        correo: "Correo",
      };

      let modifyName = campoMap[campo];
      let valueData = docente[campo];
=======
      let modifyName = "";
      let valueData = "";

      switch (campo) {
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
          this.editarTodo(docente);
          return;
      }
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d

      Swal.fire({
        title: `Editar ${modifyName}`,
        input: "text",
        inputValue: valueData,
        showCancelButton: true,
        confirmButtonText: "Modificar",
        showLoaderOnConfirm: true,
        preConfirm: (nuevoValor) => {
<<<<<<< HEAD
          nuevoValor = nuevoValor.trim().toUpperCase(); // Convierte a mayúsculas y elimina espacios innecesarios

          if (!nuevoValor) {
=======
          nuevoValor = nuevoValor.trim().toUpperCase();  // Convierte a mayúsculas y elimina espacios innecesarios

          if (!nuevoValor) {  // Verifica si el campo está vacío
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
            Swal.showValidationMessage(`Debe ingresar un ${modifyName}`);
            return false;
          }

<<<<<<< HEAD
          if (!this.validarTextoSinCaracteresEspeciales(nuevoValor)) {
            Swal.showValidationMessage(
              `No se permiten caracteres especiales en ${modifyName}`
            );
            return false;
          }

          if (nuevoValor === valueData.toUpperCase()) {
=======
          if (!this.validarTextoSinCaracteresEspeciales(nuevoValor)) {  // Verifica si el valor contiene caracteres especiales
            Swal.showValidationMessage(`No se permiten caracteres especiales en ${modifyName}`);
            return false;
          }

          if (nuevoValor === valueData.toUpperCase()) {  // Verifica si el valor es el mismo que ya existe
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
            Swal.showValidationMessage(`${modifyName} repetido!`);
            return false;
          }

<<<<<<< HEAD
          // Usar la función `actualizarDocente` para actualizar el docente
=======
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
          return this.actualizarDocente(docente.dni, { [campo]: nuevoValor });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          // Actualiza la interfaz de usuario con el nuevo valor
          Object.assign(docente, { [campo]: result.value });
          Swal.fire({
            title: `${modifyName} actualizado!`,
            icon: "success",
          });
          // Refresca la lista de docentes
          this.obtenerDocentes();
        }
      });
    },
<<<<<<< HEAD
=======

    validarTextoSinCaracteresEspeciales(texto) {
      const regex = /^[a-zA-Z0-9\s]*$/; // Solo permite letras, números y espacios
      return regex.test(texto);
    },

>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
    actualizarDocente(dni, datosActualizados) {
      return fetch(`http://127.0.0.1:8000/api/teacher/${dni}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosActualizados),
      })
<<<<<<< HEAD
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            this.obtenerDocentes(); // Suponiendo que tienes una función para obtener la lista de docentes actualizada
          } else {
            throw new Error(data.message || "Error al actualizar");
=======
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al actualizar");
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
          }
          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          Swal.showValidationMessage(`Error: ${error.message}`);
        });
    },
<<<<<<< HEAD
    eliminar(dni) {
      return fetch(`http://127.0.0.1:8000/api/teacher/${dni}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar el docente");
          }
          Swal.fire("Eliminado!", "El docente ha sido eliminado.", "success");
          this.obtenerDocentes(); // Actualiza la lista después de eliminar
        })
        .catch((error) => {
          Swal.fire("Error", error.message, "error");
        });
=======

    editarTodo(docente) {
      // Implementa un modal o similar para editar todos los campos
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
    },
    showDeleteConfirmation(dni) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminarlo!",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return this.eliminar(dni);
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    },

    modificarAll(docente) {
    this.editMode = true; // Establece el modo de edición
    this.showModal = true; // Abre el modal
    fetch(`http://127.0.0.1:8000/api/teacher/${docente.dni}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          this.docenteSeleccionado = data.teacher; // Llena el formulario con los datos del docente
          console.log(this.docenteSeleccionado)
        } else {
          console.error("Docente no encontrado");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el docente:", error);
      });
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
                            <td><strong>Nombre</strong></td>
                            <td>${docente.nombre.toUpperCase()} ${docente.apellido_paterno.toUpperCase()} ${docente.apellido_materno.toUpperCase()}</td>
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
                </div>`,
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
<<<<<<< HEAD
=======
    eliminar(id) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminarlo!",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return fetch(`http://127.0.0.1:8000/api/teacher/${id}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error al eliminar");
              }
              return response.json();
            })
            .catch((error) => {
              Swal.showValidationMessage(`Error: ${error.message}`);
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Eliminado!", "El docente ha sido eliminado.", "success");
          this.obtenerDocentes(); // Refresca la lista de docentes
        }
      });
    },
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
    toggleDropdown(id, state) {
      this.showDropdown[id] = state;
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
