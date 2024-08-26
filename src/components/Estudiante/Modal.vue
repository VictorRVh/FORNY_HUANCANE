<template>
  <div class="modal" tabindex="-1" role="dialog" :class="{ show: showModal }">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title text-center w-100">
            {{ editMode ? "Editar estudiante" : "Registrar estudiante" }}
          </h4>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>

        <!-- Form -->
        <Form @submit="submitestudiante" ref="formRef">
          <!-- Modal Body -->
          <div class="modal-body">
            <div class="input-group mb-3">
              <label for="nombre" class="input-group-text">Nombre</label>
              <Field
                type="text"
                class="form-control"
                id="nombre"
                v-model="estudiante.nombre"
                placeholder="Nombre completo del estudiante"
                name="nombre"
                :rules="'required|word'"
              />
              <ErrorMessage name="nombre" class="error_required" />
            </div>

            <div class="input-group mb-3">
              <label for="apellido_paterno" class="input-group-text"
                >Apellido Paterno</label
              >
              <Field
                type="text"
                class="form-control"
                id="apellido_paterno"
                v-model="estudiante.apellido_paterno"
                placeholder="Apellido Paterno"
                name="apellido_paterno"
                :rules="'required|word'"
              />
              <ErrorMessage name="apellido_paterno" class="error_required" />
            </div>

            <div class="input-group mb-3">
              <label for="apellido_materno" class="input-group-text"
                >Apellido Materno</label
              >
              <Field
                type="text"
                class="form-control"
                id="apellido_materno"
                v-model="estudiante.apellido_materno"
                placeholder="Apellido Materno"
                name="apellido_materno"
                :rules="'required|word'"
              />
              <ErrorMessage name="apellido_materno" class="error_required" />
            </div>

            <div class="input-group mb-3">
              <label for="dni" class="input-group-text">DNI</label>
              <Field
                type="text"
                class="form-control"
                id="dni"
                v-model="estudiante.dni"
                placeholder="DNI del estudiante"
                name="dni"
                :rules="'required|dni'"
              />
              <ErrorMessage name="dni" class="error_required" />

              <label for="celular" class="input-group-text">Celular</label>
              <Field
                type="text"
                class="form-control"
                id="celular"
                v-model="estudiante.celular"
                placeholder="Número de celular"
                name="celular"
                :rules="'required|celular'"
              />
              <ErrorMessage name="celular" class="error_required celular_error" />
            </div>

            <div class="input-group mb-3">
              <label for="correo" class="input-group-text">Correo</label>
              <Field
                type="email"
                class="form-control"
                id="correo"
                v-model="estudiante.correo"
                placeholder="Correo electrónico"
                name="correo"
                :rules="'required|email'"
              />
              <ErrorMessage name="correo" class="error_required" />
            </div>

            <div class="input-group mb-3">
              <label for="sexo" class="input-group-text">Sexo</label>
              <Field
                as="select"
                class="form-select form-control"
                id="sexo"
                v-model="estudiante.sexo"
                name="sexo"
                :rules="'required|sexo'"
              >
                <option value="" disabled>Seleccionar</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </Field>
              <ErrorMessage name="sexo" class="error_required" />

              <label for="birthdate" class="input-group-text">F. Nacimiento</label>
              <Field
                type="date"
                class="form-control"
                id="birthdate"
                v-model="estudiante.fecha_nacimiento"
                name="fecha_nacimiento"
                :rules="'required|fecha_nacimiento'"
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
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import { localize } from "@vee-validate/i18n";
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
    estudianteToEdit: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      estudiante: {
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
    if (this.editMode && this.estudianteToEdit) {
      this.estudiante = { ...this.estudianteToEdit };
    }
      */
    if (this.estudianteToEdit) {
      console.log("Editar", this.estudianteToEdit);
      this.estudiante.nombre = this.estudianteToEdit.nombre;
      this.estudiante.apellido_paterno = this.estudianteToEdit.apellido_paterno;
      this.estudiante.apellido_materno = this.estudianteToEdit.apellido_materno;
      this.estudiante.dni = this.estudianteToEdit.dni;
      this.estudiante.sexo = this.estudianteToEdit.sexo;
      this.estudiante.celular = this.estudianteToEdit.celular;
      this.estudiante.correo = this.estudianteToEdit.correo;
      this.estudiante.fecha_nacimiento = this.estudianteToEdit.fecha_nacimiento;
    } else {
      console.log("crear");
    }
  },
  methods: {
    submitestudiante() {
      const url = this.editMode
        ? `http://127.0.0.1:8000/api/students/${this.estudianteToEdit.dni}`
        : "http://127.0.0.1:8000/api/students";
      const method = this.editMode ? "PUT" : "POST";

      console.log("DATOS ENVIADOS", this.estudiante);

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.estudiante),
      })
        .then((response) => response.json())
        .then((datosRespuesta) => {
          console.log(datosRespuesta);
          this.alert_save();
          // Limpia las validaciones
          console.log("ahroatoca limpiar")
          this.resetForm();
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
        });
    },
    resetForm() {
      console.log("entro areset")
      this.$refs.formRef.resetForm();
      this.estudiante = {
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        dni: "",
        sexo: "",
        celular: "",
        correo: "",
        fecha_nacimiento: "",
      };
    },
    alert_save() {
      Swal.fire({
        position: "center",
        icon: "success",
        title: this.editMode ? "Elemento Actulizado" : "Elemento Creado",
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
.celular_error,
.fecha_error {
  margin-right: 30px;

  width: 80%;
  text-align: end;
}
</style>
