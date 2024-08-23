<template>
  <div class="container mt-5">
    <div class="search-estudent input-group w-25">
      <input v-model="estudianteCodigo" type="text" class="form-control" placeholder="DNI de estudiante" />
      <button class="input-group-text btn btn-primary" @click="fetchEstudiante">
        Buscar
      </button>
    </div>

    <h2 class="text-center mb-4 text-primary">Registrar Matrícula</h2>

    <Form @submit="submitMatricula" class="form_estudent border m-auto p-3 w-50">
      <!-- Estudiante -->
      <div class="mb-3">
        <label for="nameEst" class="form-label">Estudiante</label>
        <Field v-model="matricula.estudianteNombre" name="estudianteNombre" type="text" id="nameEst"
          class="form-control" placeholder="Nombre del estudiante" readonly />
        <ErrorMessage name="estudianteNombre" class="error_required" />
      </div>
      <!-- Turno, Créditos y Condición -->
      <div class="row mb-3">
        <div class="col-md-4">
          <label for="estudianteId" class="form-label">Código Estudiante</label>
          <Field v-model="matricula.codigo" name="estudianteCodigo" type="text" id="estudianteId" class="form-control"
            placeholder="Código" readonly />
          <ErrorMessage name="estudianteCodigo" class="error_required" />
        </div>
        <div class="col-md-4">
          <label for="turnoId" class="form-label">Turno</label>
          <Field as="select" v-model="matricula.turnoId" name="turnoId" id="turnoId" class="form-select" :rules="'required'">
            <option value="" disabled>Seleccionar Turno</option>
            <option value="T">Tarde</option>
            <option value="M">Mañana</option>
          </Field>
          <ErrorMessage name="turnoId" class="error_required" />
        </div>

        <div class="col-md-4">
          <label for="condicionId" class="form-label">Condición</label>
          <Field as="select" v-model="matricula.condicionId" name="condicionId" id="condicionId" class="form-select" :rules="'required'">
            <option value="" disabled>Seleccionar Condición</option>
            <option value="G">Gratuita</option>
            <option value="B">Becado</option>
          </Field>
          <ErrorMessage name="condicionId" class="error_required" />
        </div>
      </div>

      <!-- Especialidad -->
      <div class="mb-3 aling_error">
        <label for="especialidadId" class="form-label">Especialidad</label>
        <Field as="select" v-model="matricula.especialidadId" name="especialidadId" id="especialidadId"
          class="form-select" @change="updateDocente" :rules="'required'">
          <option value="">Seleccionar Especialidad</option>
          <option v-for="especialidad in especialidades" :key="especialidad.id" :value="especialidad.programa_estudio">
            {{ especialidad.programa_estudio }}
          </option>
        </Field>
        <ErrorMessage name="especialidadId" class="error_required" />
      </div>

      <!-- Docente -->
      <div class="mb-3 aling_error">
        <label for="docenteId" class="form-label">Docente</label>
        <Field v-model="matricula.docenteId" name="docenteId" type="text" id="docenteId" class="form-control"
          placeholder="docente" readonly />
        <ErrorMessage name="docenteId" class="error_required" />
      </div>

      <!-- Número de Recibo -->
      <div class="mb-3 aling_error">
        <label for="nroRecibo" class="form-label">Número de Recibo</label>
        <Field v-model="matricula.nroRecibo" name="nroRecibo" type="text" id="nroRecibo" class="form-control" placeholder="Número del recibo" :rules="'required|numeric'" />
        <ErrorMessage name="nroRecibo" class="error_required" />
      </div>

      <div class="btn_submit text-center">
        <button type="submit" class="btn btn-outline-primary mt-3 pl-5 w-50">
          Registrar Matrícula
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import Swal from "sweetalert2";
import { generatePdfMatricula } from '../pdf/generatePdf';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      matricula: {
        estudianteNombre: "",
        codigo: "",
        especialidadId: null,
        turnoId: null,
        docenteId: null,
        condicionId: null,
        nroRecibo: "",
      },
      estudianteCodigo: "",
      especialidades: [],
    };
  },
  mounted() {
    this.fetchEspecialidades();
  },
  methods: {
    fetchEstudiante() {
      if (this.estudianteCodigo.length > 0) {
        fetch(`http://127.0.0.1:8000/api/students/${this.estudianteCodigo}`)
          .then((response) => {
            if (!response.ok) {
              return Promise.reject("Estudiante no encontrado");
            }
            return response.json();
          })
          .then((data) => {
            this.estudiante = data.Estudiante;
            this.showEstudianteAlert(this.estudiante);
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error,
            });
            this.estudiante = null;
          });
      } else {
        Swal.fire({
          icon: "warning",
          title: "DNI vacío",
          text: "Por favor, ingrese un DNI de estudiante.",
        });
        this.estudiante = null;
      }
    },
    showEstudianteAlert(estudiante) {
      Swal.fire({
        title: `Nombre: ${estudiante.nombre}`,
        text: `DNI: ${estudiante.dni}\n¿Desea cargar los datos de este estudiante?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.matricula.estudianteNombre = `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`;
          this.matricula.codigo = `${estudiante.dni}`;
        } else {
          this.estudianteCodigo = ""; // Limpiar el código de estudiante si se cancela
        }
      });
    },
    fetchEspecialidades() {
      fetch("http://127.0.0.1:8000/api/especialidad")
        .then((response) => response.json())
        .then((data) => {
          this.especialidades = data.especialidades;
        })
        .catch((error) => {
          console.error("Error al obtener las especialidades:", error);
        });
    },
    updateDocente() {
      const selectedEspecialidad = this.especialidades.find(
        (especialidad) => especialidad.programa_estudio === this.matricula.especialidadId
      );
      if (selectedEspecialidad) {
        this.matricula.docenteId = selectedEspecialidad.docente_id;
      }
    },
    submitMatricula() {
      let submidata = {
        "codigo_estudiante_id": this.matricula.codigo,
        "turno": this.matricula.turnoId,
        "condicion": this.matricula.condicionId,
        "programa_estudio_id": this.matricula.especialidadId,
        "numero_recibo": this.matricula.nroRecibo,
      };
      console.log(submidata)
      fetch("http://127.0.0.1:8000/api/matricula", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submidata),
      })
        .then(async (response) => {
          if (response.ok) {
            const codigo = this.matricula.codigo;
            const url = `http://127.0.0.1:8000/api/fichaMatricula/${codigo}`;
            try {
              const response = await fetch(url);
              const data = await response.json();
              generatePdfMatricula(data);
            } catch (error) {
              console.error('Error fetching estudiantes:', error);
            }
          } else {
            return Promise.reject("Error al registrar matrícula");
          }
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Matrícula registrada con éxito y PDF generado.",
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error,
          });
        });
    },
  },
};
</script>

<style scoped>
.col-md-4,.aling_error{
  position: relative
}
.error_required {
  color: red;
  font-size: 12px;
  top: 38px
}
</style>
