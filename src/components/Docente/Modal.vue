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
                required
              />
            </div>

            <div class="input-group mb-3">
              <label for="apellido_paterno" class="input-group-text">Apellido Paterno</label>
              <input
                type="text"
                class="form-control"
                id="apellido_paterno"
                v-model="docente.apellido_paterno"
                @input="formatInput('apellido_paterno')"
                placeholder="Apellido Paterno"
                name="apellido_paterno"
                required
              />
            </div>

            <div class="input-group mb-3">
              <label for="apellido_materno" class="input-group-text">Apellido Materno</label>
              <input
                type="text"
                class="form-control"
                id="apellido_materno"
                v-model="docente.apellido_materno"
                @input="formatInput('apellido_materno')"
                placeholder="Apellido Materno"
                name="apellido_materno"
              />
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
                required
                maxlength="8"
                minlength="8"
              />

              <label for="celular" class="input-group-text">Celular</label>
              <input
                type="text"
                class="form-control"
                id="celular"
                v-model="docente.celular"
                @input="formatInput('celular')"
                placeholder="Número de celular"
                name="celular"
                required
                maxlength="9"
                minlength="9"
              />
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
                required
              />
            </div>

            <div class="input-group mb-3">
              <label for="sexo" class="input-group-text">Sexo</label>
              <select
                class="form-select"
                id="sexo"
                v-model="docente.sexo"
                name="sexo"
                required
              >
                <option value="" disabled>Seleccionar</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>

              <label for="birthdate" class="input-group-text">F. Nacimiento</label>
              <input
                type="date"
                class="form-control"
                id="birthdate"
                v-model="docente.fecha_nacimiento"
                name="fecha_nacimiento"
                required
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
