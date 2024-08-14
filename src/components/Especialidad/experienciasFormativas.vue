<template>
    <div>
      <div class="header">
        <h2 class="tittle">EXPERIENCIAS FORMATIVAS EN SITUACIÓN REAL DE TRABAJO</h2>
        <div class="button-container">
          <button @click="toggleForm" class="action-button agregar-button">
            {{ showForm ? 'CANCELAR' : 'AGREGAR EXPERIENCIA FORMATIVA' }}
          </button>
          <button v-if="showForm" @click="guardarExperiencia" class="action-button guardar-button">
            GUARDAR EXPERIENCIA
          </button>
        </div>
      </div>
      <div class="line"></div> <!-- Línea encima del título -->
  
      <div v-if="showForm" class="form-container">
        <table class="data-table">
          <tr>
            <th>Componente:</th>
            <td colspan="3"><input v-model="experienciaFormativa.componente" type="text" /></td>
          </tr>
          <tr>
            <th>Fecha de Inicio:</th>
            <td><input v-model="experienciaFormativa.fechaInicio" type="date" @input="emitirFechas" /></td>
            <th>Fecha de Término:</th>
            <td><input v-model="experienciaFormativa.fechaTermino" type="date" @input="emitirFechas" /></td>
          </tr>
          <tr>
            <th>Créditos:</th>
            <td><input v-model="experienciaFormativa.creditos" type="number" @input="actualizarTotalesExperiencia" /></td>
            <th>Días:</th>
            <td><input v-model="experienciaFormativa.dias" type="number" /></td>
          </tr>
          <tr>
            <th>Horas:</th>
            <td><input v-model="experienciaFormativa.horas" type="number" @input="actualizarTotalesExperiencia" /></td>
          </tr>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showForm: false,
        experienciaFormativa: {
          componente: '',
          fechaInicio: '',
          fechaTermino: '',
          creditos: '',
          dias: '',
          horas: ''
        },
        especialidadId: 1 // Ejemplo, ajusta según sea necesario
      };
    },
    methods: {
      toggleForm() {
        this.showForm = !this.showForm;
      },
      actualizarTotalesExperiencia() {
        this.$emit('actualizarTotalesExperiencia', {
          horas: this.experienciaFormativa.horas,
          creditos: this.experienciaFormativa.creditos,
        });
      },
      emitirFechas() {
        this.$emit('actualizarFechas', {
          fechaInicio: this.experienciaFormativa.fechaInicio,
          fechaTermino: this.experienciaFormativa.fechaTermino,
        });
      },
      guardarExperiencia() {
        const experienciaData = {
          ...this.experienciaFormativa,
          especialidadId: this.especialidadId, // Asociar la experiencia con la especialidad
        };
  
        fetch('http://127.0.0.1:8000/api/experienciaFormativa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(experienciaData),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al guardar la experiencia formativa');
          }
          return response.json();
        })
        .then(data => {
          alert('Experiencia formativa guardada exitosamente.');
          this.toggleForm(); // Ocultar el formulario después de guardar
        })
        .catch(error => {
          console.error('Error al guardar la experiencia formativa:', error);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .tittle {
    margin: 0;
    text-align: left; /* Alinea el título a la izquierda */
    color: #921733;
  }
  
  .button-container {
    display: flex;
    gap: 10px;
  }
  
  .line {
    width: 100%;
    height: 1px;
    background-color: #921733;
    margin-bottom: 30px; /* Espacio entre la línea y el formulario */
    margin-top: 20px; /* Espacio encima de la línea */
  }
  
  .form-container {
    margin-top: 30px; /* Espacio entre el título y el formulario */
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
  }
  
  .action-button, .guardar-button, .agregar-button {
    background-color: #921733;
    color: #ffffff;
    padding: 10px;
    border: none;
    border-top: 2px solid #921733;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    text-align: center;
  }
  </style>
  