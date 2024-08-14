<template>
    <div>
      <div class="header-container">
        <h3 class="title">Indicadores de Logro (IL)</h3>
      </div>
      <div v-for="(il, ilIndex) in indicadoresLogro" :key="ilIndex" class="indicador-item">
        <table class="data-table">
          <tr>
            <th><strong>IL {{ ilIndex + 1 }}:</strong></th>
            <td>
              <input 
                v-model="il.indicador" 
                type="text" 
                placeholder="Ingrese el indicador de logro" 
                @input="toUpperCase(ilIndex)" 
                class="input-field"
              />
            </td>
            <td v-if="indicadoresLogro.length > 1">
              <button 
                @click="eliminarIndicadorLogro(ilIndex)" 
                class="action-button eliminar-button"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </table>
      </div>
      <div class="full-width-buttons">
        <button 
          @click="agregarIndicadorLogro" 
          class="action-button agregar-boton"
        >
          Agregar Indicador
        </button>
        <button 
          @click="guardarIndicadores" 
          class="action-button guardar-button"
        >
          GUARDAR INDICADORES
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      indicadoresLogro: {
        type: Array,
        required: true,
      },
      unidadId: {
        type: Number,
        required: true,
      }
    },
    methods: {
      toUpperCase(ilIndex) {
        this.indicadoresLogro[ilIndex].indicador = this.indicadoresLogro[ilIndex].indicador.toUpperCase();
      },
      agregarIndicadorLogro() {
        this.indicadoresLogro.push({ indicador: '' });
      },
      eliminarIndicadorLogro(ilIndex) {
        this.indicadoresLogro.splice(ilIndex, 1);
      },
      guardarIndicadores() {
        if (!this.unidadId) {
          alert('Primero debes guardar la unidad.');
          return;
        }
    
        this.indicadoresLogro.forEach((indicador, ilIndex) => {
          fetch('http://127.0.0.1:8000/api/indicador_logro', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              descripcion: indicador.indicador,
              unidad_didactica_id: this.unidadId,
            })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error al guardar el indicador de logro ${ilIndex + 1}`);
            }
            return response.json();
          })
          .then(data => {
            alert(`Indicador de logro ${ilIndex + 1} guardado.`);
          })
          .catch(error => {
            console.error(`Error al guardar el indicador de logro ${ilIndex + 1}:`, error);
          });
        });
      }
    }
  }
  </script>
  
  <style scoped>
  /* Estilos para Indicadores de Logro */
  
  .title {
    color: #921733;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
  }
  
  .header-container {
    margin-bottom: 20px;
    border-top: 0.5px solid #921733;
  }
  
  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  
  .data-table th,
  .data-table td {
    border: 1px solid #ddd;
    padding: 8px;
    vertical-align: middle;
  }
  
  .data-table th {
    background-color: #921733;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
  }
  
  .input-field {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
    border-radius: 0; /* Bordes rectos para el input */
  }
  
  .indicador-item {
    margin-bottom: 15px;
  }
  
  .full-width-buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 20px;
  }
  
  .action-button {
    background-color: #921733;
    color: #ffffff;
    padding: 10px;
    border: none;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    text-align: center;
    flex: 1;
    border-radius: 0; /* Bordes rectos para los botones */
  }
  
  .eliminar-button {
    background-color: #ff4d4d;
  }
  
  .agregar-boton, .guardar-button {
    margin-top: 10px;
  }
  </style>
  