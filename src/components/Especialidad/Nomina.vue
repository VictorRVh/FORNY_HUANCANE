<template>
  <div class="container">
    <hr class="section-separator" />
    <div class="header-container">
      <h1>AGREGAR ESPECIALIDAD</h1>
      <!-- Botón para enviar el formulario -->
      <button @click="submitForm" class="action-button">GUARDAR</button>
    </div>
    <table class="data-table">
      <tr>
        <th><label for="programa_estudio">Programa de Estudios:</label></th>
        <td colspan="3">
          <input 
            id="programa_estudio" 
            v-model="formData.programa_estudio" 
            type="text" 
            placeholder="Escriba su programa de estudios aquí" 
            @input="toUpperCase('programa_estudio')" 
          />
        </td>
      </tr>
      <tr>
        <th><label for="ciclo_formativo">Ciclo Formativo:</label></th>
        <td><input id="ciclo_formativo" v-model="formData.ciclo_formativo" type="text" placeholder="Escriba su ciclo formativo aquí" @input="toUpperCase('ciclo_formativo')" /></td>
        <th><label for="modalidad">Modalidad:</label></th>
        <td><input id="modalidad" v-model="formData.modalidad" type="text" readonly /></td>
      </tr>
      <tr>
        <th><label for="modulo_formativo">Módulo Formativo:</label></th>
        <td colspan="3"><input id="modulo_formativo" v-model="formData.modulo_formativo" type="text" placeholder="Escriba su módulo formativo aquí" @input="toUpperCase('modulo_formativo')" /></td>
      </tr>
      <tr>
        <th><label for="descripcion_especialidad">Descripción Especialidad:</label></th>
        <td colspan="3"><textarea id="descripcion_especialidad" v-model="formData.descripcion_especialidad" placeholder="Escriba la descripción de la especialidad aquí" @input="toUpperCase('descripcion_especialidad')"></textarea></td>
      </tr>
      <tr>
        <th><label for="docente_id">Docente:</label></th>
        <td colspan="3">
          <select id="docente_id" v-model="formData.docente_id">
            <option value="" disabled selected>Seleccione un docente</option>
            <option v-for="docente in docentes" :key="docente.dni" :value="docente.dni">
              {{ docente.nombre }} {{ docente.apellido_paterno }} {{ docente.apellido_materno }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <th><label for="periodo_academico">Periodo Académico:</label></th>
        <td><input id="periodo_academico" v-model="formData.periodo_academico" type="text" readonly /></td>
        <th><label for="hora_semanal">Horas Semanales:</label></th>
        <td><input id="hora_semanal" v-model="formData.hora_semanal" type="number" placeholder="Escriba las horas semanales aquí" min="0" /></td>
      </tr>
      <tr>
        <th><label for="seccion">Sección:</label></th>
        <td><input id="seccion" v-model="formData.seccion" type="text" placeholder="Escriba la sección aquí" @input="toUpperCase('seccion')" /></td>
        <th><label for="turno">Turno:</label></th>
        <td>
          <select id="turno" v-model="formData.turno">
            <option value="" disabled selected>Seleccione un turno</option>
            <option v-for="turno in turnos" :key="turno.id" :value="turno.id">
              {{ turno.descripcion }}
            </option>
          </select>
        </td>
      </tr>
    </table>

    <!-- Mostrar los componentes UnidadesDidacticas y ExperienciasFormativas solo si se ha agregado la especialidad -->
    <unidades-didacticas 
      v-if="mostrarUnidades" 
      :especialidadId="especialidadId"
    ></unidades-didacticas>
    
    <experiencias-formativas 
      v-if="mostrarUnidades" 
      :especialidadId="especialidadId"
    ></experiencias-formativas>
  </div>
</template>

<script>
import UnidadesDidacticas from './unidadesForm.vue';
import ExperienciasFormativas from './experienciasFormativas.vue';

export default {
  components: {
    UnidadesDidacticas,
    ExperienciasFormativas,
  },
  data() {
    return {
      formData: {
        programa_estudio: '',
        ciclo_formativo: '',
        modalidad: 'PRESENCIAL',
        modulo_formativo: '',
        descripcion_especialidad: '',
        docente_id: null,
        periodo_academico: '2024-II',
        hora_semanal: '',
        seccion: '',
        turno: null,
      },
      especialidadId: null, // Campo para almacenar el ID de la especialidad
      docentes: [],
      turnos: [
        { id: 'M', descripcion: 'Mañana' },
        { id: 'T', descripcion: 'Tarde' },
        { id: 'N', descripcion: 'Noche' }
      ],
      mostrarUnidades: false,
    };
  },
  mounted() {
    this.fetchDocentes();
  },
  methods: {
    fetchDocentes() {
      fetch('http://127.0.0.1:8000/api/teacherName')
        .then(response => response.json())
        .then(data => {
          this.docentes = data.teachers;
        })
        .catch(error => {
          console.error('Error al obtener los docentes:', error);
        });
    },
    toUpperCase(field) {
      this.formData[field] = this.formData[field].toUpperCase();
    },
    submitForm() {
      if (this.isFormValid()) {
        fetch('http://127.0.0.1:8000/api/especialidad', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
          return response.json();
        })
        .then(data => {
          this.especialidadId = data.especialidad; // Guardar el ID de la especialidad
          alert('Especialidad Agregada - Ingrese Sus Unidades');
          this.mostrarUnidades = true; // Mostrar los componentes UnidadesDidacticas y ExperienciasFormativas
        })
        .catch(error => {
          console.error('Error al enviar el formulario:', error);
        });
      } else {
        alert('Por favor, complete todos los campos antes de enviar el formulario.');
      }
    },
    isFormValid() {
      return this.formData.programa_estudio &&
             this.formData.ciclo_formativo &&
             this.formData.modulo_formativo &&
             this.formData.descripcion_especialidad &&
             this.formData.docente_id &&
             this.formData.hora_semanal &&
             this.formData.seccion &&
             this.formData.turno;
    }
  }
}
</script>

<style scoped>
/* Aquí se aplica la tipografía a todo el formulario */
.container {
  font-family: 'Arial', sans-serif; /* Puedes cambiar esto a la tipografía que prefieras */
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  overflow-y: scroll;
  border-radius: 8px;
  height: 80vh;

}

h1, h2 {
  color: #921733;
  margin-bottom: 20px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.data-table th, .data-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.data-table th {
  background-color: #921733;
  color: white;
}

.data-table td input,
.data-table td select,
.data-table td textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif; /* Asegurarte de que los inputs también usen la tipografía */
}

/* Estilo para el placeholder más grueso */
::placeholder {
  font-weight: bold;
  color: #888;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-container h1 {
  margin: 0;
}

.header-container .action-button {
  background-color: #921733;
  color: #ffffff;
  padding: 10px 20px;
  border: 2px solid #921733;
  border-radius: 4px;
  cursor: pointer;
}

/* Línea separadora del mismo color que el título */
.section-separator {
  border: 0;
  height: 1px;
  background-color: #921733;
  margin: 20px 0;
}
</style>
