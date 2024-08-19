<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4 text-primary">Registrar Estudiante</h2>

    <form @submit.prevent="submitEstudiante" class="form_estudent border p-3">
      <!-- Nombre -->
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          v-model="estudiante.nombre"
          type="text"
          id="nombre"
          class="form-control"
          placeholder="Nombre completo del estudiante"
          @input="formatInput('nombre')"
        />
        <span v-if="errores.nombre" class="text-danger">{{ errores.nombre }}</span>
      </div>

      <!-- Apellido Paterno -->
      <div class="mb-3">
        <label for="apellidoPaterno" class="form-label">Apellido Paterno</label>
        <input
          v-model="estudiante.apellido_paterno"
          type="text"
          id="apellidoPaterno"
          class="form-control"
          placeholder="Apellido Paterno"
          @input="formatInput('apellido_paterno')"
        />
        <span v-if="errores.apellido_paterno" class="text-danger">{{ errores.apellido_paterno }}</span>
      </div>

      <!-- Apellido Materno -->
      <div class="mb-3">
        <label for="apellidoMaterno" class="form-label">Apellido Materno</label>
        <input
          v-model="estudiante.apellido_materno"
          type="text"
          id="apellidoMaterno"
          class="form-control"
          placeholder="Apellido Materno"
          @input="formatInput('apellido_materno')"
        />
      </div>

      <!-- DNI, Sexo y Fecha de Nacimiento -->
      <div class="row mb-3">
        <div class="col-md-3">
          <label for="dni" class="form-label">DNI</label>
          <input
            v-model="estudiante.dni"
            type="text"
            id="dni"
            class="form-control"
            placeholder="DNI del estudiante"
            @input="formatInput('dni')"
          />
          <span v-if="errores.dni" class="text-danger">{{ errores.dni }}</span>
        </div>

        <div class="col-md-4">
          <label for="sexo" class="form-label">Sexo</label>
          <select
            v-model="estudiante.sexo"
            id="sexo"
            class="form-select"
          >
            <option value="" disabled>Seleccionar</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
          <span v-if="errores.sexo" class="text-danger">{{ errores.sexo }}</span>
        </div>

        <div class="col-md-5">
          <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento</label>
          <input
            v-model="estudiante.fecha_nacimiento"
            type="date"
            id="fechaNacimiento"
            class="form-control"
          />
          <span v-if="errores.fecha_nacimiento" class="text-danger">{{ errores.fecha_nacimiento }}</span>
        </div>
      </div>

      <!-- Celular y Correo -->
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="celular" class="form-label">Celular</label>
          <input
            v-model="estudiante.celular"
            type="text"
            id="celular"
            class="form-control"
            placeholder="Número de celular"
            @input="formatInput('celular')"
          />
          <span v-if="errores.celular" class="text-danger">{{ errores.celular }}</span>
        </div>

        <div class="col-md-6">
          <label for="correo" class="form-label">Correo</label>
          <input
            v-model="estudiante.correo"
            type="email"
            id="correo"
            class="form-control"
            placeholder="Correo electrónico"
          />
          <span v-if="errores.correo" class="text-danger">{{ errores.correo }}</span>
        </div>
      </div>

      <div class="btn_submit text-center">
        <button type="submit" class="btn btn-outline-primary pl-5 w-25">Registrar</button>
      </div>

      <!-- Mostrar Código de Estudiante generado después del registro -->
      <div v-if="estudiante.codigo_estudiante" class="mt-3">
        <div class="mb-3">
          <label for="codigoEstudiante" class="form-label">Código de Estudiante</label>
          <input
            :value="estudiante.codigo_estudiante"
            type="text"
            id="codigoEstudiante"
            class="form-control"
            readonly
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      estudiante: {
        id: "",
        codigo_estudiante: "",
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        dni: "",
        sexo: "",
        celular: "",
        correo: "",
        fecha_nacimiento: "",
      },
      errores: {}
    };
  },
  methods: {
    formatInput(field) {
      this.estudiante[field] = this.estudiante[field]
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .toUpperCase();
    },
    validarFormulario() {
      this.errores = {};

      if (!this.estudiante.nombre) {
        this.errores.nombre = "El nombre es obligatorio.";
      }
      if (!this.estudiante.apellido_paterno) {
        this.errores.apellido_paterno = "El apellido paterno es obligatorio.";
      }
      if (!this.estudiante.dni) {
        this.errores.dni = "El DNI es obligatorio.";
      } else if (this.estudiante.dni.length !== 8) {
        this.errores.dni = "El DNI debe tener 8 caracteres.";
      }
      if (!this.estudiante.sexo) {
        this.errores.sexo = "El sexo es obligatorio.";
      }
      if (!this.estudiante.celular) {
        this.errores.celular = "El número de celular es obligatorio.";
      } else if (this.estudiante.celular.length !== 9) {
        this.errores.celular = "El número de celular debe tener 9 caracteres.";
      }
      if (!this.estudiante.correo) {
        this.errores.correo = "El correo es obligatorio.";
      } else if (!this.validarEmail(this.estudiante.correo)) {
        this.errores.correo = "El formato del correo no es válido.";
      }
      if (!this.estudiante.fecha_nacimiento) {
        this.errores.fecha_nacimiento = "La fecha de nacimiento es obligatoria.";
      }

      return Object.keys(this.errores).length === 0;
    },
    validarEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    async submitEstudiante() {
      if (!this.validarFormulario()) {
        Swal.fire({
          icon: "warning",
          title: "Formulario incompleto",
          text: "Por favor, complete todos los campos obligatorios.",
        });
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/students", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.estudiante),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al registrar el estudiante");
        }

        const datosRespuesta = await response.json();
        this.alert_save();
        this.estudiante.codigo_estudiante = datosRespuesta.codigo_estudiante;
        this.estudiante.id = datosRespuesta.id;

        // Limpiar los campos del formulario, excepto el código de estudiante
        this.estudiante.nombre = "";
        this.estudiante.apellido_paterno = "";
        this.estudiante.apellido_materno = "";
        this.estudiante.dni = "";
        this.estudiante.sexo = "";
        this.estudiante.celular = "";
        this.estudiante.correo = "";
        this.estudiante.fecha_nacimiento = "";

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
        title: "Estudiante Creado",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
};
</script>

<style scoped>
.form_estudent {
  width: 500px;
  margin: auto;
}
</style>
