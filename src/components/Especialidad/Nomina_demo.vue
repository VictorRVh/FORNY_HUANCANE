<template>
    <div class="container mt-5">
      <div class="row justify-content-between align-items-center mb-4">
        <div class="col-md-8">
          <h1 class="text-primary">Agregar Especialidad</h1>
        </div>
        <div class="col-md-4 text-right">
          <button @click="submitForm" class="btn btn-primary">Guardar</button>
        </div>
      </div>
  
      <hr class="mb-4">
  
      <form @submit.prevent="submitForm">
      <!-- Programa de Estudios -->
      <div class="input-group row ">
        <label for="programa_estudio" class="col-sm-3 text-white input-group-text bg-primary">Programa de Estudios:</label>
        <input 
          id="programa_estudio" 
          v-model="formData.programa_estudio" 
          type="text" 
          class="form-control col-sm-9 p-2" 
          placeholder="Escriba su programa de estudios aquí" 
          @input="toUpperCase('programa_estudio')" 
        />
      </div>
  
      <!-- Ciclo Formativo y Modalidad -->
      <div class="input-group row ">
        <label for="ciclo_formativo" class="col-sm-3 text-white input-group-text bg-primary">Ciclo Formativo:</label>
        <input 
          id="ciclo_formativo" 
          v-model="formData.ciclo_formativo" 
          type="text" 
          class="form-control col-sm-4 p-2" 
          placeholder="Escriba su ciclo formativo aquí" 
          @input="toUpperCase('ciclo_formativo')" 
        />
        <label for="modalidad" class="col-sm-3 text-white input-group-text bg-primary">Modalidad:</label>
        <input 
          id="modalidad" 
          v-model="formData.modalidad" 
          type="text" 
          class="form-control col-sm-4 p-2" 
          readonly 
        />
      </div>
  
      <!-- Módulo Formativo -->
      <div class="input-group row ">
        <label for="modulo_formativo" class="col-sm-3 text-white input-group-text bg-primary">Módulo Formativo:</label>
        
          <input 
            id="modulo_formativo" 
            v-model="formData.modulo_formativo" 
            type="text" 
            class="form-control col-sm-9" 
            placeholder="Escriba su módulo formativo aquí" 
            @input="toUpperCase('modulo_formativo')" 
          />
       
      </div>
  
      <!-- Descripción Especialidad -->
      <div class="input-group row ">
        <label for="descripcion_especialidad" class="col-sm-3 text-white input-group-text bg-primary">Descripción Especialidad:</label>
        
          <textarea 
            id="descripcion_especialidad" 
            v-model="formData.descripcion_especialidad" 
            class="form-control col-sm-9" 
            placeholder="Escriba la descripción de la especialidad aquí" 
            @input="toUpperCase('descripcion_especialidad')"
          ></textarea>
        
      </div>
  
      <!-- Docente -->
      <div class="input-group row ">
        <label for="docente_id" class="col-sm-3 text-white input-group-text bg-primary">Docente:</label>
        
          <select 
            id="docente_id" 
            v-model="formData.docente_id" 
            class="form-control col-sm-9"
          >
            <option value="" disabled selected>Seleccione un docente</option>
            <option v-for="docente in docentes" :key="docente.dni" :value="docente.dni">
              {{ docente.nombre }} {{ docente.apellido_paterno }} {{ docente.apellido_materno }}
            </option>
          </select>
        
      </div>
  
      <!-- Periodo Académico y Horas Semanales -->
      <div class="input-group row ">
        <label for="periodo_academico" class="col-sm-3 text-white input-group-text bg-primary">Periodo Académico:</label>
       
          <input 
            id="periodo_academico" 
            v-model="formData.periodo_academico" 
            type="text" 
            class="form-control col-sm-4" 
            readonly 
          />
      
        <label for="hora_semanal" class="col-sm-3 text-white input-group-text bg-primary">Horas Semanales:</label>
        
          <input 
            id="hora_semanal" 
            v-model="formData.hora_semanal" 
            type="number" 
            class="form-control col-sm-4" 
            placeholder="Escriba las horas semanales aquí" 
            min="0" 
          />
       
      </div>
  
      <!-- Sección y Turno -->
      <div class="input-group row ">
        <label for="seccion" class="col-sm-3 text-white input-group-text bg-primary">Sección:</label>
        
          <input 
            id="seccion" 
            v-model="formData.seccion" 
            type="text" 
            class="form-control col-sm-4" 
            placeholder="Escriba la sección aquí" 
            @input="toUpperCase('seccion')" 
          />
        
        <label for="turno" class="col-sm-3 text-white input-group-text bg-primary">Turno:</label>
        
          <select 
            id="turno" 
            v-model="formData.turno" 
            class="form-control col-sm-4"
          >
            <option value="" disabled selected>Seleccione un turno</option>
            <option v-for="turno in turnos" :key="turno.id" :value="turno.id">
              {{ turno.descripcion }}
            </option>
          </select>
        
      </div>
    </form>
  
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
  
  