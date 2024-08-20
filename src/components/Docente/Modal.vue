<template>
  <div class="modal" tabindex="-1" role="dialog" :class="{ show: showModal }">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title text-center w-100">
            {{ editMode ? "Editar Docente" : "Registrar Docente" }}
          </h4>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitDocente">
          <!-- Modal Body -->
          <div class="modal-body">
            <div class="input-group mb-3">
              <label for="nombre" class="input-group-text">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="nombre"
                v-model="docente.nombre"
                @input="formatInput('nombre')"
                placeholder="Nombre completo del Docente"
                name="nombre"
<<<<<<< HEAD
                :rules="'required|word'"
=======
                required
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
              />
              <ErrorMessage name="nombre" class="error_required" />
            </div>

            <div class="input-group mb-3">
              <label for="apellido_paterno" class="input-group-text">Apellido Paterno</label>
<<<<<<< HEAD
              <Field
=======
              <input
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
                type="text"
                class="form-control"
                id="apellido_paterno"
                v-model="docente.apellido_paterno"
                @input="formatInput('apellido_paterno')"
                placeholder="Apellido Paterno"
                name="apellido_paterno"
<<<<<<< HEAD
                :rules="'required|word'"
=======
                required
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
              />
              <ErrorMessage name="apellido_paterno" class="error_required" />
            </div>

            <div class="input-group mb-3">
              <label for="apellido_materno" class="input-group-text">Apellido Materno</label>
<<<<<<< HEAD
              <Field
=======
              <input
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
                type="text"
                class="form-control"
                id="apellido_materno"
                v-model="docente.apellido_materno"
                @input="formatInput('apellido_materno')"
                placeholder="Apellido Materno"
                name="apellido_materno"
                :rules="'required|word'"
              />
              <ErrorMessage name="apellido_materno" class="error_required" />
            </div>

            <div class="input-group mb-3">
              <label for="dni" class="input-group-text">DNI</label>
              <input
                type="text"
                class="form-control"
                id="dni"
                v-model="docente.dni"
                @input="formatInput('dni')"
                placeholder="DNI del docente"
                name="dni"
<<<<<<< HEAD
                :rules="'required|dni'"
=======
                required
                maxlength="8"
                minlength="8"
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
              />
              <ErrorMessage name="dni" class="error_required" />

              <label for="celular" class="input-group-text">Celular</label>
              <input
                type="text"
                class="form-control"
                id="celular"
                v-model="docente.celular"
                @input="formatInput('celular')"
                placeholder="Número de celular"
                name="celular"
<<<<<<< HEAD
                :rules="'required|celular'"
=======
                required
                maxlength="9"
                minlength="9"
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
              />
              <ErrorMessage name="celular" class="error_required celular_error" />
            </div>

            <div class="input-group mb-3">
              <label for="correo" class="input-group-text">Correo</label>
              <input
                type="email"
                class="form-control"
                id="correo"
                v-model="docente.correo"
                placeholder="Correo electrónico"
                name="correo"
<<<<<<< HEAD
                :rules="'required|email'"
=======
                required
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
              />
              <ErrorMessage name="correo" class="error_required" />
            </div>

            <div class="input-group mb-3">
              <label for="sexo" class="input-group-text">Sexo</label>
              <select
                class="form-select"
                id="sexo"
                v-model="docente.sexo"
                name="sexo"
<<<<<<< HEAD
                :rules="'required|sexo'"
=======
                required
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
              >
                <option value="" disabled>Seleccionar</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
<<<<<<< HEAD
              </Field>
              <ErrorMessage name="sexo" class="error_required" />
=======
              </select>
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d

              <label for="birthdate" class="input-group-text">F. Nacimiento</label>
              <input
                type="date"
                class="form-control"
                id="birthdate"
                v-model="docente.fecha_nacimiento"
                name="fecha_nacimiento"
<<<<<<< HEAD
                :rules="'required|fecha_nacimiento'"
=======
                required
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
              />
              <ErrorMessage name="fecha_nacimiento" class="error_required fecha_error" />
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer d-flex justify-content-center w-100">
            <button type="button" class="btn btn-primary" @click="closeModal">
              Cerrar
            </button>
            <button type="submit" class="btn btn-success">
              {{ editMode ? "Actualizar" : "Guardar" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    editMode: {
      type: Boolean,
      default: false, // false para agregar, true para editar
    },
    docenteToEdit: {
      type:Object,
      default: null
    }
  },
  data() {
    return {
      docente: {
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        dni: "",
        sexo: "",
        celular: "",
        correo: "",
        fecha_nacimiento: "",
      },
    };
  },
  mounted() {
    /*
    if (this.editMode && this.docenteToEdit) {
      this.docente = { ...this.docenteToEdit };
    }
      */
     if(this.docenteToEdit){
        console.log("Editar",this.docenteToEdit)
        this.docente.nombre =   this.docenteToEdit.nombre;
        this.docente.apellido_paterno = this.docenteToEdit.apellido_paterno ;
        this.docente.apellido_materno = this.docenteToEdit.apellido_materno;
        this.docente.dni = this.docenteToEdit.dni;
        this.docente.sexo = this.docenteToEdit.sexo;
        this.docente.celular = this.docenteToEdit.celular;
        this.docente.correo = this.docenteToEdit.correo;
        this.docente.fecha_nacimiento = this.docenteToEdit.fecha_nacimiento;
     }
     else{
       console.log("crear")
     }
  },
  methods: {
<<<<<<< HEAD
    submitDocente() {
      const url = this.editMode
        ? `http://127.0.0.1:8000/api/teacher/${this.docenteToEdit.dni}`
        : "http://127.0.0.1:8000/api/teacher";
      const method = this.editMode ? "PUT" : "POST";
      
      console.log("DATOS ENVIADOS",this.docente)

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.docente),
      })
        .then((response) => response.json())
        .then((datosRespuesta) => {
          console.log(datosRespuesta);
          this.alert_save();
          this.docente = {
            nombre: "",
            apellido_paterno: "",
            apellido_materno: "",
            dni: "",
            sexo: "",
            celular: "",
            correo: "",
            fecha_nacimiento: "",
          };
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
=======
    formatInput(field) {
      // Permitir solo letras, números y espacios, y convertir a mayúsculas
      this.docente[field] = this.docente[field]
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .toUpperCase();
    },
    async submitDocente() {
      // Verificar que todos los campos requeridos estén completos
      if (
        !this.docente.nombre ||
        !this.docente.apellido_paterno ||
        !this.docente.dni ||
        !this.docente.sexo ||
        !this.docente.celular ||
        !this.docente.correo ||
        !this.docente.fecha_nacimiento
      ) {
        Swal.fire({
          icon: "warning",
          title: "Formulario incompleto",
          text: "Por favor, complete todos los campos obligatorios.",
>>>>>>> 6ae795dc6aa13ee68f4cf6eea07cf5e7c3f6984d
        });
        return;
      }

      // Validación de la fecha de nacimiento (mínimo 18 años)
      const today = new Date();
      const birthDate = new Date(this.docente.fecha_nacimiento);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        Swal.fire({
          icon: "error",
          title: "Fecha de nacimiento inválida",
          text: "El docente debe tener al menos 18 años.",
        });
        return;
      }

      // Validación de longitud del DNI y celular
      if (this.docente.dni.length !== 8) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El DNI debe tener 8 caracteres.",
        });
        return;
      }
      if (this.docente.celular.length !== 9) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El número de celular debe tener 9 caracteres.",
        });
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/teacher", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.docente),
        });

        if (!response.ok) {
          const errorData = await response.json();

          // Manejar los errores específicos
          if (errorData.error === "DNI_DUPLICATE" || errorData.error === "EMAIL_DUPLICATE") {
            throw new Error("El DNI o el correo ya se encuentra registrado, verifique nuevamente.");
          } else {
            throw new Error("Error en la validación de datos.");
          }
        }

        // Si no hay errores, procesar la respuesta
        const datosRespuesta = await response.json();
        this.alert_save();
        this.docente = {
          nombre: "",
          apellido_paterno: "",
          apellido_materno: "",
          dni: "",
          sexo: "",
          celular: "",
          correo: "",
          fecha_nacimiento: "",
        };
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Ocurrió un error al procesar la solicitud.",
        });
      }
    },
    alert_save() {
      Swal.fire({
        position: "center",
        icon: "success",
        title: this.editMode?"Elemento Actulizado":"Elemento Creado",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
<style scoped>
.error_required {
  color: red;
  font-size: 0.8em;
  margin-top: 34px;
  
}
.celular_error,.fecha_error{

  margin-right: 30px;
 
  width: 80%;
  text-align: end;
}
</style>
