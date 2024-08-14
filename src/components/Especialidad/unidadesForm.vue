<template>
    <div>
      <div class="header-container">
        <h2 class="title">AGREGAR UNIDADES DIDÁCTICAS</h2>
      </div>
  
      <!-- Caja de Controlador de Horas y Créditos -->
      <div class="controlador-container">
        <h3 class="controlador-title">Controlador de Horas y Créditos</h3>
        <p>Total Horas: {{ formData.total_horas }}</p>
        <p>Total Créditos: {{ formData.total_creditos }}</p>
        <p>Fecha de Inicio: {{ unidades[0]?.fecha_inicio || 'N/A' }}</p>
        <p>Fecha de Término: {{ formData.fechaTermino || unidades[unidades.length - 1]?.fecha_final || 'N/A' }}</p>
      </div>
  
      <div v-if="unidades.length > 0">
        <div
          v-for="(unidad, index) in unidades"
          :key="index"
          :ref="'unidad-' + index"
          class="unidad"
        >
          <div class="unidad-header">
            <h1 class="subtitle">UNIDAD {{ index + 1 }}</h1>
            <div class="button-group">
              <button
                @click="guardarUnidad(index)"
                class="action-button guardar-button"
                :disabled="unidad.guardando"
              >
                GUARDAR UNIDAD
              </button>
              <div
                v-if="index === unidades.length - 1"
                class="action-buttons-group"
              >
                <button
                  @click="agregarUnidad"
                  v-if="unidades.length < 7"
                  class="action-button agregar-unidad-boton"
                >
                  Agregar Unidad
                </button>
                <button
                  @click="eliminarUnidad(index)"
                  v-if="unidades.length > 1"
                  class="action-button eliminar-unidad-boton"
                >
                  Eliminar Unidad
                </button>
              </div>
            </div>
          </div>
          <table class="data-table">
            <tr>
              <th>Nombre de la Unidad Didáctica:</th>
              <td colspan="3">
                <input
                  v-model="unidad.nombre_unidad"
                  type="text"
                  placeholder="Ingrese el nombre de la unidad didáctica"
                  @input="toUpperCase('nombre_unidad', index)"
                />
              </td>
            </tr>
            <tr>
              <th>Fecha de Inicio:</th>
              <td><input v-model="unidad.fecha_inicio" type="date" /></td>
              <th>Fecha de Término:</th>
              <td>
                <input
                  v-model="unidad.fecha_final"
                  type="date"
                  @change="actualizarFechasUnidad(index)"
                />
              </td>
            </tr>
            <tr>
              <th>Créditos:</th>
              <td>
                <input
                  v-model="unidad.credito_unidad"
                  type="number"
                  placeholder="Ingrese los créditos"
                  @input="actualizarTotales"
                />
              </td>
              <th>Horas:</th>
              <td>
                <input
                  v-model="unidad.hora"
                  type="number"
                  placeholder="Ingrese las horas"
                  @input="actualizarTotales"
                />
              </td>
            </tr>
            <tr>
              <th>Días:</th>
              <td>
                <input
                  v-model="unidad.dia"
                  type="number"
                  placeholder="Ingrese los días"
                />
              </td>
            </tr>
            <tr>
              <th>Capacidad de la Unidad Didáctica:</th>
              <td colspan="3">
                <textarea
                  v-model="unidad.descripcion_capacidad"
                  placeholder="Descripción de la capacidad"
                ></textarea>
              </td>
            </tr>
          </table>
  
          <!-- Componente indicadorLogro.vue -->
          <div>
            <indicador-logro
              :unidad="unidad"
              :unidadIndex="index"
            />
          </div>
        </div>
      </div>
  
      <div v-else>
        <button @click="agregarUnidad" class="action-button">
          Agregar la Primera Unidad
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import IndicadorLogro from './indicadorLogro.vue';
  
  export default {
    props: {
      especialidadId: {
        type: String, // Especialidad ID es un string de 4 caracteres
        required: true,
      },
    },
    data() {
      return {
        unidades: [],
        formData: {
          total_horas: 0,
          total_creditos: 0,
          fechaTermino: null,
        },
      };
    },
    components: {
      IndicadorLogro,
    },
    methods: {
      toUpperCase(field, index = null) {
        if (index !== null) {
          this.unidades[index][field] = this.unidades[index][field].toUpperCase();
        } else {
          this.formData[field] = this.formData[field].toUpperCase();
        }
      },
      actualizarTotales() {
        let totalHoras = 0;
        let totalCreditos = 0;
        this.unidades.forEach((unidad) => {
          totalHoras += parseFloat(unidad.hora) || 0;
          totalCreditos += parseFloat(unidad.credito_unidad) || 0;
        });
        this.formData.total_horas = totalHoras;
        this.formData.total_creditos = totalCreditos;
      },
      actualizarFechasUnidad(index) {
        if (index === this.unidades.length - 1) {
          this.formData.fechaTermino = this.unidades[index].fecha_final;
        }
      },
      agregarUnidad() {
        this.unidades.push({
          especialidad_id: this.especialidadId,
          nombre_unidad: '',
          fecha_inicio: '',
          fecha_final: '',
          credito_unidad: 0,
          hora: 0,
          dia: 0,
          descripcion_capacidad: '',
          guardada: false,  // Estado que indica si la unidad ha sido guardada
          guardando: false, // Estado para controlar la deshabilitación del botón de guardado
        });
        this.$nextTick(() => {
          const lastIndex = this.unidades.length - 1;
          const lastUnit = this.$refs[`unidad-${lastIndex}`];
          if (lastUnit && lastUnit[0]) {
            lastUnit[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
        this.actualizarTotales();
      },
      eliminarUnidad(index) {
        this.unidades.splice(index, 1);
        this.$nextTick(() => {
          if (this.unidades.length > 0 && index > 0) {
            const previousUnit = this.$refs[`unidad-${index - 1}`];
            if (previousUnit && previousUnit[0]) {
              previousUnit[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        });
        this.actualizarTotales();
      },
      guardarUnidad(index) {
        const unidad = this.unidades[index];
        unidad.guardando = true;
  
        fetch('http://127.0.0.1:8000/api/unidad_didactica', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(unidad),
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((error) => {
                throw new Error(error.message || 'Error al guardar la unidad');
              });
            }
            return response.json();
          })
          .then((data) => {
            alert(`Unidad ${index + 1} guardada exitosamente.`);
            unidad.guardada = true; // Marcar la unidad como guardada
          })
          .catch((error) => {
            alert('Error: ' + error.message);
            console.error('Error al guardar la unidad:', error);
          })
          .finally(() => {
            unidad.guardando = false;
          });
      },
    },
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap');
  
  .title,
  .subtitle {
    color: #921733;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
  }
  
  .header-container {
    margin-bottom: 20px;
  }
  
  .controlador-container {
    position: fixed;
    top: 100px;
    right: 10px;
    padding: 10px;
    background-color: transparent;
    border-bottom: 2px solid #921733;
    font-family: 'Montserrat', sans-serif;
  }
  
  .controlador-title {
    margin: 0 0 10px 0;
    color: #921733;
    font-weight: 600;
  }
  
  .unidad-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
  }
  
  .action-buttons-group {
    display: flex;
    gap: 10px;
  }
  
  .action-button,
  .guardar-button {
    background-color: #921733;
    color: #ffffff;
    padding: 10px;
    border: none;
    border-bottom: 2px solid #921733;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    text-align: center;
  }
  
  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .data-table th,
  .data-table td {
    border: 0.5px solid #ddd;
    padding: 8px;
    vertical-align: middle;
  }
  
  .data-table th {
    background-color: #921733;
    color: white;
    text-align: left;
    font-family: 'Montserrat', 'sans-serif';
    font-weight: 600;
  }
  
  .data-table td input,
  .data-table td select,
  .data-table td textarea {
    width: calc(100% - 16px);
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: 'Montserrat', sans-serif;
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .full-width-buttons {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  
  .agregar-boton,
  .guardar-button,
  .agregar-unidad-boton,
  .eliminar-unidad-boton {
    flex: 1;
    margin-top: 10px;
  }
  </style>
  