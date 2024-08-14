<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4 text-primary">Registrar Estudiante</h2>

    <Form @submit="submitEstudiante" class="form_estudent border p-3">
      <!-- Nombre -->
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <Field
          v-model="estudiante.nombre"
          name="nombre"
          type="text"
          id="nombre"
          class="form-control"
          placeholder="Nombre completo del estudiante"
          rules="required"
        />
      </div>

      <!-- Apellido Paterno -->
      <div class="mb-3">
        <label for="apellidoPaterno" class="form-label">Apellido Paterno</label>
        <Field
          v-model="estudiante.apellido_paterno"
          name="apellido_paterno"
          type="text"
          id="apellidoPaterno"
          class="form-control"
          placeholder="Apellido Paterno"
          rules="required"
        />
      </div>

      <!-- Apellido Materno -->
      <div class="mb-3">
        <label for="apellidoMaterno" class="form-label">Apellido Materno</label>
        <Field
          v-model="estudiante.apellido_materno"
          name="apellido_materno"
          type="text"
          id="apellidoMaterno"
          class="form-control"
          placeholder="Apellido Materno"
        />
      </div>

      <!-- DNI, Sexo y Fecha de Nacimiento -->
      <div class="row mb-3">
        <div class="col-md-3">
          <label for="dni" class="form-label">DNI</label>
          <Field
            v-model="estudiante.dni"
            name="dni"
            type="text"
            id="dni"
            class="form-control"
            placeholder="DNI del estudiante"
            rules="required"
          />
        </div>

        <div class="col-md-4">
          <label for="sexo" class="form-label">Sexo</label>
          <Field
            as="select"
            v-model="estudiante.sexo"
            name="sexo"
            id="sexo"
            class="form-select"
            rules="required"
          >
            <option value="" disabled>Seleccionar</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </Field>
        </div>

        <div class="col-md-5">
          <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento</label>
          <Field
            v-model="estudiante.fecha_nacimiento"
            name="fecha_nacimiento"
            type="date"
            id="fechaNacimiento"
            class="form-control"
          />
        </div>
      </div>

      <!-- Celular y Correo -->
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="celular" class="form-label">Celular</label>
          <Field
            v-model="estudiante.celular"
            name="celular"
            type="text"
            id="celular"
            class="form-control"
            placeholder="Número de celular"
          />
        </div>

        <div class="col-md-6">
          <label for="correo" class="form-label">Correo</label>
          <Field
            v-model="estudiante.correo"
            name="correo"
            type="email"
            id="correo"
            class="form-control"
            placeholder="Correo electrónico"
            rules="required"
          />
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
    </Form>
  </div>
</template>

<script>
import { Form, Field, useForm } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import Swal from "sweetalert2";


export default {
  components: {
    Form,
    Field,
  },
  data() {
    return {
      estudiante: {
        id: "", // Este campo se llenará con el ID generado por la base de datos después de la creación.
        codigo_estudiante: "", // Este campo se llenará con el código de estudiante generado automáticamente.
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        dni: "",
        sexo: "", // 'M' para Masculino y 'F' para Femenino
        celular: "",
        correo: "",
        fecha_nacimiento: "", // Añadido el campo de fecha de nacimiento
      },
    };
  },
  methods: {
    submitEstudiante() {
      fetch("http://127.0.0.1:8000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.estudiante),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al registrar el estudiante"); // Manejo de errores HTTP
          }
          return response.json();
        })
        .then((datosRespuesta) => {
          console.log(datosRespuesta);
          this.alert_save(); // Asegúrate de que esta función esté definida en tu componente

          // Limpiar los campos del formulario, excepto el código de estudiante
          this.estudiante = {
            nombre: "",
            apellido_paterno: "",
            apellido_materno: "",
            dni: "",
            sexo: "", // Restablecer al valor inicial
            celular: "",
            correo: "",
            fecha_nacimiento: "",
          };
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(`Error: ${error.message}`);
        });
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
/* Puedes ajustar los estilos aquí si es necesario */
.form_estudent {
  width: 500px;
  margin: auto;
}
</style>
