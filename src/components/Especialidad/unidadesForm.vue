<template>
  <div>
      <div class="header-container">
          <h2 class="title">AGREGAR UNIDADES DIDÁCTICAS</h2>
      </div>

      <div class="controlador-container">
          <h3 class="controlador-title">Controlador de Horas y Créditos</h3>
          <p>Total Horas: {{ total_horas }}</p>
          <p>Total Créditos: {{ total_creditos }}</p>
          <p>Fecha de Inicio: {{ unidades.length ? unidades[0].fecha_inicio : 'N/A' }}</p>
          <p>Fecha de Término: {{ fechaTermino }}</p>
      </div>

      <div v-if="unidades.length > 0">
          <div v-for="(unidad, index) in unidades" :key="index" :ref="'unidad-' + index" class="unidad">
              <div class="unidad-header">
                  <h1 class="subtitle">UNIDAD {{ index + 1 }}</h1>
                  <div class="button-group">
                      <button @click="guardarUnidad(index)" class="button" :disabled="unidad.guardando">
                          GUARDAR UNIDAD
                      </button>
                      <div v-if="index === unidades.length - 1" class="action-buttons-group">
                          <button @click="agregarUnidad" v-if="unidades.length < 7" class="button">
                              Agregar Unidad
                          </button>
                          <button @click="eliminarUnidad(index)" v-if="unidades.length > 1" class="button">
                              Eliminar Unidad
                          </button>
                      </div>
                  </div>
              </div>
              
              <p v-if="unidad.id_unidad">ID Unidad Guardada: {{ unidad.id_unidad }}</p>

              <table class="data-table">
                  <tr>
                      <th>Nombre de la Unidad Didáctica:</th>
                      <td colspan="3">
                          <input v-model="unidad.nombre_unidad" type="text" placeholder="Ingrese el nombre de la unidad didáctica" @input="toUpperCase(unidad, 'nombre_unidad')" />
                      </td>
                  </tr>
                  <tr>
                      <th>Fecha de Inicio:</th>
                      <td><input v-model="unidad.fecha_inicio" type="date" /></td>
                      <th>Fecha de Término:</th>
                      <td><input v-model="unidad.fecha_final" type="date" @change="actualizarFechasUnidad(index)" /></td>
                  </tr>
                  <tr>
                      <th>Créditos:</th>
                      <td><input v-model="unidad.credito_unidad" type="number" placeholder="Ingrese los créditos" @input="actualizarTotales()" /></td>
                      <th>Horas:</th>
                      <td><input v-model="unidad.hora" type="number" placeholder="Ingrese las horas" @input="actualizarTotales()" /></td>
                  </tr>
                  <tr>
                      <th>Días:</th>
                      <td><input v-model="unidad.dia" type="number" placeholder="Ingrese los días" /></td>
                  </tr>
                  <tr>
                      <th>Capacidad de la Unidad Didáctica:</th>
                      <td colspan="3"><textarea v-model="unidad.descripcion_capacidad" placeholder="Descripción de la capacidad"></textarea></td>
                  </tr>
              </table>

              <div class="indicadores-logro-container">
                  <h3 class="subtitle">Indicadores de Logro</h3>
                  <table class="data-table">
                      <tr v-for="(il, ilIndex) in unidad.indicadoresLogro" :key="ilIndex">
                          <th><strong>I.L {{ ilIndex + 1 }}:</strong></th>
                          <td colspan="2">
                              <input v-model="il.indicador" type="text" placeholder="Ingrese el indicador de logro" @input="toUpperCase(il, 'indicador')" />
                          </td>
                          <td>
                              <button @click="guardarIndicador(index, ilIndex)" class="button">
                                  Guardar
                              </button>
                          </td>
                          <td>
                              <button @click="eliminarIndicadorLogro(index, ilIndex)" v-if="unidad.indicadoresLogro.length > 1" class="button">
                                  Eliminar
                              </button>
                          </td>
                      </tr>
                  </table>
                  <div class="full-width-buttons">
                      <button @click="agregarIndicadorLogro(index)" class="button">Agregar Indicador</button>
                  </div>
              </div>
              
              <hr class="division-line" />
          </div>
      </div>

      <div v-else>
          <button @click="agregarUnidad" class="button">Agregar la Primera Unidad</button>
      </div>
  </div>
</template>

<script>
export default {
  props: {
      especialidadId: {
          type: String,
          required: true,
      },
  },
  data() {
      return {
          unidades: [],
          total_horas: 0,
          total_creditos: 0,
          fechaTermino: null,
      };
  },
  methods: {
      toUpperCase(obj, key) {
          obj[key] = obj[key].toUpperCase();
      },
      actualizarTotales() {
          this.total_horas = this.unidades.reduce((sum, unidad) => sum + (parseFloat(unidad.hora) || 0), 0);
          this.total_creditos = this.unidades.reduce((sum, unidad) => sum + (parseFloat(unidad.credito_unidad) || 0), 0);
      },
      actualizarFechasUnidad(index) {
          if (index === this.unidades.length - 1) {
              this.fechaTermino = this.unidades[index].fecha_final;
          }
      },
      agregarUnidad() {
          this.unidades.push({
              nombre_unidad: '',
              fecha_inicio: '',
              fecha_final: '',
              credito_unidad: 0,
              hora: 0,
              dia: 0,
              descripcion_capacidad: '',
              indicadoresLogro: [],
              guardando: false,
              id_unidad: null,
          });
          this.actualizarTotales();
      },
      eliminarUnidad(index) {
          this.unidades.splice(index, 1);
          this.actualizarTotales();
      },
      guardarUnidad(index) {
          const unidad = this.unidades[index];
          unidad.especialidad_id = this.especialidadId;
          unidad.guardando = true;

          fetch('http://127.0.0.1:8000/api/unidad_didactica', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(unidad),
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
            console.log(data.unidad_didactica)
              unidad.id_unidad = data.unidad_didactica;
              unidad.guardando = false;
              alert(`Unidad ${index + 1} guardada. ID: ${data.unidad_didactica}`);
          })
          .catch(error => {
              console.error('Error al guardar la unidad:', error);
              alert('Error al guardar la unidad.');
              unidad.guardando = false;
          });
      },
      agregarIndicadorLogro(index) {
          this.unidades[index].indicadoresLogro.push({ indicador: '' });
      },
      eliminarIndicadorLogro(index, ilIndex) {
          this.unidades[index].indicadoresLogro.splice(ilIndex, 1);
      },
      guardarIndicador(index, ilIndex) {
          const indicador = {
              descripcion: this.unidades[index].indicadoresLogro[ilIndex].indicador,
              unidad_didactica_id: this.unidades[index].id_unidad
          };

          console.log(indicador)

          if (!indicador.unidad_didactica_id) {
              alert('Primero guarda la unidad.');
              return;
          }

          fetch('http://127.0.0.1:8000/api/indicador_logro', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(indicador),
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
          })
          .then(() => {
              alert(`Indicador ${ilIndex + 1} guardado.`);
          })
          .catch(error => {
              console.error('Error al guardar el indicador:', error);
              alert('Error al guardar el indicador. Verifica la URL y el método HTTP.');
          });
      },
  },
};
</script>



<style scoped>
/* Estilos del componente */
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

/* Clase unificada para todos los botones */
.button {
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
transition: background-color 0.3s ease;
}

.button:hover {
background-color: #b22b44;
}

.button:disabled {
background-color: #cccccc;
cursor: not-allowed;
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

.indicadores-logro-container {
margin-top: 20px;
}

.division-line {
border: 0;
height: 1px;
background-color: #ddd;
margin: 20px 0;
}

.full-width-buttons {
margin-top: 10px;
display: flex;
justify-content: flex-start;
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
