<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4 text-primary">Registrar Matrícula</h2>

    <Form @submit.prevent="submitMatricula" class="form_estudent border p-3">
      <!-- Estudiante -->
      <div class="mb-3">
        <label for="estudianteId" class="form-label">Estudiante</label>
        <Field
          v-model="estudianteCodigo"
          @input="fetchEstudiante"
          name="estudianteCodigo"
          type="text"
          id="estudianteId"
          class="form-control"
          placeholder="Ingrese código de estudiante (solo números)"
        />
        <div v-if="estudiante" class="mt-3">
          <p><strong>Nombre:</strong> {{ estudiante.nombre }} {{ estudiante.apellidoPaterno }} {{ estudiante.apellidoMaterno }}</p>
          <p><strong>Turno:</strong> {{ estudiante.turno }}</p>
          <p><strong>Condición:</strong> {{ estudiante.condicion }}</p>
        </div>
      </div>

      <!-- Turno, Créditos y Condición -->
      <div class="row mb-3">
        <div class="col-md-4">
          <label for="turnoId" class="form-label">Turno</label>
          <Field
            as="select"
            v-model="matricula.turnoId"
            name="turnoId"
            id="turnoId"
            class="form-select"
          >
            <option value="">Seleccionar Turno</option>
            <!-- Opciones de turnos se deben cargar desde la base de datos -->
          </Field>
        </div>

        <div class="col-md-4">
          <label for="creditos" class="form-label">Créditos</label>
          <Field
            v-model.number="matricula.creditos"
            name="creditos"
            type="number"
            id="creditos"
            class="form-control"
            placeholder="Número de créditos"
            min="1"
            max="6"
          />
        </div>

        <div class="col-md-4">
          <label for="condicionId" class="form-label">Condición</label>
          <Field
            as="select"
            v-model="matricula.condicionId"
            name="condicionId"
            id="condicionId"
            class="form-select"
          >
            <option value="">Seleccionar Condición</option>
            <!-- Opciones de condiciones se deben cargar desde la base de datos -->
          </Field>
        </div>
      </div>

      <!-- Especialidad -->
      <div class="mb-3">
        <label for="especialidadId" class="form-label">Especialidad</label>
        <Field
          as="select"
          v-model="matricula.especialidadId"
          name="especialidadId"
          id="especialidadId"
          class="form-select"
        >
          <option value="">Seleccionar Especialidad</option>
          <!-- Opciones de especialidades se deben cargar desde la base de datos -->
        </Field>
      </div>

      <!-- Docente -->
      <div class="mb-3">
        <label for="docenteId" class="form-label">Docente</label>
        <Field
          as="select"
          v-model="matricula.docenteId"
          name="docenteId"
          id="docenteId"
          class="form-select"
        >
          <option value="">Seleccionar Docente</option>
          <!-- Opciones de docentes se deben cargar desde la base de datos -->
        </Field>
      </div>

      <!-- Número de Recibo -->
      <div class="mb-3">
        <label for="nroRecibo" class="form-label">Número de Recibo</label>
        <Field
          v-model="matricula.nroRecibo"
          name="nroRecibo"
          type="text"
          id="nroRecibo"
          class="form-control"
          placeholder="Número del recibo"
        />
      </div>

      <div class="btn_submit text-center">
        <button type="submit" class="btn btn-outline-primary pl-5 w-25">Registrar Matrícula</button>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";

export default {
  components: {
    Form,
    Field,
  },
  data() {
    return {
      matricula: {
        estudianteId: null,
        especialidadId: null,
        turnoId: null,
        docenteId: null,
        creditos: 1,
        condicionId: null,
        nroRecibo: '',
      },
      estudianteCodigo: '',
      estudiante: null,
    };
  },
  methods: {
    async fetchEstudiante() {
      if (this.estudianteCodigo.length > 0) {
        try {
          const response = await fetch(`/api/estudiantes/${this.estudianteCodigo}`);
          if (response.ok) {
            this.estudiante = await response.json();
          } else {
            this.estudiante = null;
          }
        } catch (error) {
          console.error('Error fetching estudiante:', error);
          this.estudiante = null;
        }
      } else {
        this.estudiante = null;
      }
    },
    async submitMatricula() {
      try {
        const response = await fetch('/api/registrar-matricula', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.matricula),
        });

        if (response.ok) {
          alert('Matrícula registrada con éxito y PDF generado.');
        } else {
          console.error('Error al registrar matrícula');
        }
      } catch (error) {
        console.error('Error al registrar matrícula:', error);
      }
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
