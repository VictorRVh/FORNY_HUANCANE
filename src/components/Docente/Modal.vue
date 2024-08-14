<template>
  <div class="modal" tabindex="-1" role="dialog" :class="{ show: showModal }">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title text-center w-100">Registrar Docente</h4>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>

        <!-- Form -->
        <Form @submit="submitDocente">
          <!-- Modal Body -->
          <div class="modal-body">
            <div class="input-group mb-3">
              <label for="nombre" class="input-group-text">Nombre</label>
              <Field
                type="text"
                class="form-control"
                id="nombre"
                v-model="docente.nombre"
                placeholder="Nombre completo del Docente"
                name="nombre"
              />
            </div>

            <div class="input-group mb-3">
              <label for="apellido_paterno" class="input-group-text"
                >Apellido Paterno</label
              >
              <Field
                type="text"
                class="form-control"
                id="apellido_paterno"
                v-model="docente.apellido_paterno"
                placeholder="Apellido Paterno"
                name="apellido_paterno"
              />
            </div>

            <div class="input-group mb-3">
              <label for="apellido_materno" class="input-group-text"
                >Apellido Materno</label
              >
              <Field
                type="text"
                class="form-control"
                id="apellido_materno"
                v-model="docente.apellido_materno"
                placeholder="Apellido Materno"
                name="apellido_materno"
              />
            </div>

            <div class="input-group mb-3">
              <label for="dni" class="input-group-text">DNI</label>
              <Field
                type="text"
                class="form-control"
                id="dni"
                v-model="docente.dni"
                placeholder="DNI del docente"
                name="dni"
              />

              <label for="celular" class="input-group-text">Celular</label>
              <Field
                type="text"
                class="form-control"
                id="celular"
                v-model="docente.celular"
                placeholder="Número de celular"
                name="celular"
              />
            </div>

            <div class="input-group mb-3">
              <label for="correo" class="input-group-text">Correo</label>
              <Field
                type="email"
                class="form-control"
                id="correo"
                v-model="docente.correo"
                placeholder="Correo electrónico"
                name="correo"
              />
            </div>

            <div class="input-group mb-3">
              <label for="sexo" class="input-group-text">Sexo</label>
              <Field
                as="select"
                class="form-select form-control"
                id="sexo"
                v-model="docente.sexo"
                name="sexo"
              >
                <option value="" disabled>Seleccionar</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </Field>

              <label for="birthdate" class="input-group-text">F. Nacimiento</label>
              <Field
                type="date"
                class="form-control"
                id="birthdate"
                v-model="docente.fecha_nacimiento"
                name="fecha_nacimiento"
              />
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer d-flex justify-content-center w-100">
            <button type="button" class="btn btn-primary" @click="closeModal">
              Cerrar
            </button>
            <button type="submit" class="btn btn-success">Guardar</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import Swal from "sweetalert2";

export default {
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
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
  methods: {
    submitDocente() {
      fetch("http://127.0.0.1:8000/api/teacher", {
        method: "POST",
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
        });
    },
    alert_save() {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Docente Creado",
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
  margin-top: 5px;
}
</style>
