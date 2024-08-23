<template>
  <h2 class="text-primary">Estudiante</h2>

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
      <div v-if="mostrarFiltros" class=" w-50 d-flex justify-content-center">
        <div class="">
          <label for="especialidadId" class="form-label text-primary"><b>Especialidad</b></label>
          <Field
            as="select"
            v-model="especialidadId.especialidad"
            name="especialidadId"
            id="especialidadId"
            class="form-select"
            @change="updateDocente()"
          >
            <option value="">Seleccionar Especialidad</option>
            <option
              v-for="especialidad in estudianteEspecialidad"
              :key="especialidad.id"
              :value="especialidad.programa_estudio"
            >
              {{ especialidad.programa_estudio }}
            </option>
          </Field>
        </div>
        <div class="m-4">    </div>
        <div class="ml-3">
          <label for="turnoId" class="form-label text-primary"><b>Turno</b></label>
          <Field as="select" v-model="especialidadId.turno" name="turnoId" id="turnoId" class="form-select "  @change="updateDocente">
            <option value="" disabled>Seleccionar Turno</option>
            <option value="M">Mañana</option>
            <option value="T">Tarde</option>
          </Field>
        </div>
      </div>
      <div class="input-group mb-3 w-25 d-flex">

        <button class="btn btn-primary" @click="mostrarFiltros = !mostrarFiltros">
          Mostrar Matriculados
        </button>

        <button class="btn btn-primary" @click="openModal">Agregar</button>
        <Modal
          :key="estudianteSeleccionado"
          :showModal="showModal"
          :editMode="editMode"
          :estudianteToEdit="estudianteSeleccionado"
          @close-modal="closeModal"
          @estudianteActualizado="obtenerestudiantes"
        />
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
                  @click.prevent="verestudiante(estudiante.dni)"
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
                    <a class="dropdown-item" href="#" @click="modificarAll(estudiante)"
                      >Editar Todo</a
                    >
                  </li>
                </ul>

                <a
                  href="#"
                  class="btn btn-outline-danger m-2"
                  @click="showDeleteConfirmation(estudiante.dni)"
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
      mostrarFiltros: false,
      showModal: false, // Renombrado
      showDropdown: {},
      estudianteEspecialidad:[],
      especialidadId:{
        turno: null,
        especialidad :null
      },
      estudiantes: [],
      editMode: false,
      estudiantesFiltrados: [],
      estudianteSeleccionado: null, // Agregado para almacenar el estudiante seleccionado
    };
  },

  created() {
    this.obtenerestudiantes();
    this.obtenerEspecialidad();
  },
  components: {
    Modal,
  },

  methods: {
    obtenerestudiantes() {
      fetch("http://127.0.0.1:8000/api/students")
        .then((response) => response.json())
        .then((data) => {
          this.estudiantes = data.Estudiantes; // Accede al array de estudiantes en la respuesta
          this.estudiantesFiltrados = this.estudiantes;
        })
        .catch((error) => {
          console.error("Error al obtener los estudiantes:", error);
        });
    },
    obtenerEspecialidad(){
      fetch("http://127.0.0.1:8000/api/especialidad")
        .then((response) => response.json())
        .then((data) => {
          this.estudianteEspecialidad = data.especialidades; // Accede al array de estudiantes en la respuesta
         
        })
        .catch((error) => {
          console.error("Error al obtener los estudiantes:", error);
        });
    },
    updateDocente(){
       
     if(this.especialidadId.especialidad.length>0 && this.especialidadId.turno.length>0 ){
           
       fetch(`http://127.0.0.1:8000/api/especialidad/${this.especialidadId.especialidad}/students/${this.especialidadId.turno}`)
        .then((response) => response.json())
        .then((data) => {
          this.estudiantes = data.estudiantes; // Accede al array de estudiantes en la respuesta
          console.log(this.estudiantes)
          //this.estudiantesFiltrados = this.estudiantes;
        })
        .catch((error) => {
          console.error("Error al obtener los estudiantes:", error);
        });

     }

      
    },

    filter(estudiante) {
      return estudiante.nombre.toLowerCase().includes(this.filterField.toLowerCase());
    },
    openModal() {
      this.editMode = false; // Modo de agregar
      this.estudianteSeleccionado = null; // Limpia los datos
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.obtenerestudiantes();
    },
    exportar() {
      // Implementar funcionalidad de exportar
    },
    validarTextoSinCaracteresEspeciales(texto) {
      const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s]*$/; // Solo permite letras, números y espacios
      return regex.test(texto);
    },
    modificar(campo, estudiante) {
      const campoMap = {
        nombre: "Nombre",
        apellido_paterno: "Apellido Paterno",
        apellido_materno: "Apellido Materno",
        celular: "Celular",
        correo: "Correo",
      };

      let modifyName = campoMap[campo];
      let valueData = estudiante[campo];

      Swal.fire({
        title: `Editar ${modifyName}`,
        input: "text",
        inputValue: valueData,
        showCancelButton: true,
        confirmButtonText: "Modificar",
        showLoaderOnConfirm: true,
        preConfirm: (nuevoValor) => {
          nuevoValor = nuevoValor.trim().toUpperCase(); // Convierte a mayúsculas y elimina espacios innecesarios

          if (!nuevoValor) {
            Swal.showValidationMessage(`Debe ingresar un ${modifyName}`);
            return false;
          }

          if (!this.validarTextoSinCaracteresEspeciales(nuevoValor)) {
            Swal.showValidationMessage(
              `No se permiten caracteres especiales en ${modifyName}`
            );
            return false;
          }

          if (nuevoValor === valueData.toUpperCase()) {
            Swal.showValidationMessage(`${modifyName} repetido!`);
            return false;
          }

          // Usar la función `actualizarestudiante` para actualizar el estudiante
          return this.actualizarestudiante(estudiante.dni, { [campo]: nuevoValor });
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
    actualizarestudiante(dni, datosActualizados) {
      return fetch(`http://127.0.0.1:8000/api/students/${dni}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosActualizados),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            this.obtenerestudiantes(); // Suponiendo que tienes una función para obtener la lista de estudiantes actualizada
          } else {
            throw new Error(data.message || "Error al actualizar");
          }
        })
        .catch((error) => {
          Swal.showValidationMessage(`Error: ${error}`);
        });
    },
    eliminar(dni) {
      return fetch(`http://127.0.0.1:8000/api/students/${dni}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar el estudiante");
          }
          Swal.fire("Eliminado!", "El estudiante ha sido eliminado.", "success");
          this.obtenerestudiantes(); // Actualiza la lista después de eliminar
        })
        .catch((error) => {
          Swal.fire("Error", error.message, "error");
        });
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

    modificarAll(estudiante) {
      this.editMode = true; // Establece el modo de edición
      this.showModal = true; // Abre el modal
      fetch(`http://127.0.0.1:8000/api/students/${estudiante.dni}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            this.estudianteSeleccionado = data.Estudiante; // Llena el formulario con los datos del estudiante
            console.log(this.estudianteSeleccionado);
          } else {
            console.error("estudiante no encontrado");
          }
        })
        .catch((error) => {
          console.error("Error al obtener el estudiante:", error);
        });
    },
    verestudiante(dni) {
      fetch(`http://127.0.0.1:8000/api/students/${dni}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener los datos del estudiante");
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === 200) {
            const estudiante = data.Estudiante;
            Swal.fire({
              title: `Información de ${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`,
              html: `<div class="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <table class="table table-bordered">
                        <tbody>
                          <tr>
                            <td ><strong>Nombre</strong></td>
                            <td>${estudiante.nombre} ${estudiante.apellido_paterno} ${
                estudiante.apellido_materno
              }</td>
                          </tr>
                          <tr>
                            <td><strong>DNI</strong></td>
                            <td>${estudiante.dni}</td>
                          </tr>
                          <tr>
                            <td><strong>Sexo</strong></td>
                            <td>${estudiante.sexo}</td>
                          </tr>
                          <tr>
                            <td><strong>Celular</strong></td>
                            <td>${estudiante.celular}</td>
                          </tr>
                          <tr>
                            <td><strong>Correo</strong></td>
                            <td>${estudiante.correo}</td>
                          </tr>
                          <tr>
                            <td class="w-30"><strong>Fecha de nacimiento</strong></td>
                            <td>${estudiante.fecha_nacimiento}</td>
                          </tr>
                          <tr>
                            <td><strong>Creado el</strong></td>
                            <td>${new Date(
                              estudiante.created_at
                            ).toLocaleDateString()}</td>
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
            throw new Error("estudiante no encontrado");
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
    toggleDropdown(id, state) {
      this.showDropdown[id] = state;
    },
  },
};
</script>

<style scoped>
.custom-table-wrapper {
  height: 70vh;
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
  position: relative;
}

.dropdown-menu {
  position: absolute;
  left: -100px;
  right: 0;
  margin: auto;
  width: 100px;
  top: 58px;
}
</style>
