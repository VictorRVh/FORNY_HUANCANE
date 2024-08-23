<template>
  <div>
    <div class="header-container">
      <h2 class="title">AGREGAR UNIDADES DIDÁCTICAS</h2>
    </div>

    <div class="controlador-container">
      <h3 class="controlador-title">Controlador</h3>
      <div class="controlador-content">
        <div class="controlador-content-item">
          <p><span class="text-primary">Total Horas:</span> {{ total_horas }}</p>
          <p><span class="text-primary">Total Créditos:</span> {{ total_creditos }}</p>
        </div>
        <div class="controlador-content-item">
          <p>
            <span class="text-primary">Fecha de Inicio:</span>
            {{ unidades.length ? unidades[0].fecha_inicio : "N/A" }}
          </p>
          <p><span class="text-primary">Fecha de Término:</span> {{ fechaTermino }}</p>
        </div>
      </div>
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
              class="btn btn-primary"
              v-if="!unidades[index].show"
            >
              GUARDAR UNIDAD
            </button>
            <div v-if="unidades[index].show" class="action-buttons-group">
              <button
                @click="agregarUnidad"
                v-if="unidades[index].show"
                class="btn btn-primary add-btn"
              >
                Agregar Unidad
              </button>
              <button
                @click="updateUnidad(index, unidad.id_unidad)"
                v-if="unidades[index].show"
                class="btn btn-success"
              >
                Actializar
              </button>

              <button
                @click="eliminarUnidad(index, unidad.id_unidad)"
                v-if="unidades[index].show"
                class="btn btn-primary"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>

        <p v-if="unidad.id_unidad">ID Unidad Guardada: {{ unidad.id_unidad }}</p>

        <table class="data-table">
          <tr>
            <th>Nombre de la Unidad Didáctica:</th>
            <td colspan="3">
              <input
                v-model="unidad.nombre_unidad"
                type="text"
                placeholder="Ingrese el nombre de la unidad didáctica"
                @input="toUpperCase(unidad, 'nombre_unidad')"
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
                @input="actualizarTotales()"
              />
            </td>
            <th>Horas:</th>
            <td>
              <input
                v-model="unidad.hora"
                type="number"
                placeholder="Ingrese las horas"
                @input="actualizarTotales()"
              />
            </td>
          </tr>
          <tr>
            <th>Días:</th>
            <td>
              <input v-model="unidad.dia" type="number" placeholder="Ingrese los días" />
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

        <div class="indicadores-logro-container" v-if="unidades[index].guardando">
          <h3 class="subtitle">Indicadores de Logro</h3>
          <table class="data-table">
            <tr v-for="(il, ilIndex) in unidad.indicadoresLogro" :key="ilIndex">
              <th>
                <strong>I.L {{ ilIndex + 1 }}:</strong>
              </th>
              <td colspan="2">
                <input
                  v-model="il.indicador"
                  type="text"
                  placeholder="Ingrese el indicador de logro"
                  @input="toUpperCase(il, 'indicador')"
                />
              </td>
              <td class="d-flex justify-content-center">
                <button
                  v-if="!unidades[index].indicadoresLogro[ilIndex].guardado"
                  @click="guardarIndicador(index, ilIndex)"
                  class="btn btn-primary"
                >
                  Guardar
                </button>
                <button
                  @click="
                    actualizarIndicadorLogro(
                      index,
                      ilIndex,
                      unidades[index].indicadoresLogro[ilIndex].id_indicador
                    )
                  "
                  v-if="unidades[index].indicadoresLogro[ilIndex].guardado == true"
                  class="btn btn-success"
                >
                  Actualizar
                </button>
                <button
                  @click="
                    eliminarIndicadorLogro(
                      index,
                      ilIndex,
                      unidades[index].indicadoresLogro[ilIndex].id_indicador
                    )
                  "
                  v-if="unidades[index].indicadoresLogro[ilIndex].guardado == true"
                  class="btn btn-primary ml-2"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </table>
          <div class="full-width-buttons">
            <button @click="agregarIndicadorLogro(index)" class="button">
              Agregar Indicador
            </button>
          </div>
        </div>

        <hr class="division-line" />
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

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
  created() {
    this.agregarUnidad();
  },
  methods: {
    toUpperCase(obj, key) {
      obj[key] = obj[key].toUpperCase();
    },
    actualizarTotales() {
      this.total_horas = this.unidades.reduce(
        (sum, unidad) => sum + (parseFloat(unidad.hora) || 0),
        0
      );
      this.total_creditos = this.unidades.reduce(
        (sum, unidad) => sum + (parseFloat(unidad.credito_unidad) || 0),
        0
      );
    },
    actualizarFechasUnidad(index) {
      if (index === this.unidades.length - 1) {
        this.fechaTermino = this.unidades[index].fecha_final;
      }
    },
    agregarUnidad() {
      this.unidades.push({
        nombre_unidad: "",
        fecha_inicio: "",
        fecha_final: "",
        credito_unidad: 0,
        hora: 0,
        dia: 0,
        descripcion_capacidad: "",
        indicadoresLogro: [],
        guardando: false,
        id_unidad: null,
        show: false,
      });
      this.actualizarTotales();
      //this.agregarUnidad()
    },
    alert_save(message, icon_) {
      Swal.fire({
        position: "center",
        icon: icon_,
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    alert_save_btn(message, text, icon) {
      Swal.fire({
        title: message,
        text: text,
        icon: icon,
      });
    },
    updateUnidad(index, id_unidad) {
      const unidad = this.unidades[index];

      return fetch(`http://127.0.0.1:8000/api/unidad_didactica/${id_unidad}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(unidad),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al Actulizar Unidad");
          }
          Swal.fire("Actualizado!", "La Unidad ha sido actualizado.", "success");
        })
        .catch((error) => {
          Swal.fire("Error", error.message, "error");
        });
    },
    eliminarUnidad(index, id_unidad) {
      if (this.unidades[index].guardando) {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "No podrás revertir esto! ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminarlo!",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return fetch(`http://127.0.0.1:8000/api/unidad_didactica/${id_unidad}`, {
              method: "DELETE",
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error al eliminar el Unidad");
                }
                this.unidades.splice(index, 1);
                this.actualizarTotales();
                Swal.fire("Eliminado!", "La Unidad ha sido eliminado.", "success");
              })
              .catch((error) => {
                Swal.fire("Error", error.message, "error");
              });
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      } else {
        this.unidades.splice(index, 1);
        this.actualizarTotales();
      }
    },
    isFormUnidad(unidadFrom) {
      return (
        unidadFrom.nombre_unidad &&
        unidadFrom.fecha_inicio &&
        unidadFrom.fecha_final &&
        unidadFrom.credito_unidad &&
        unidadFrom.hora &&
        unidadFrom.dia &&
        unidadFrom.descripcion_capacidad
      );
    },
    guardarUnidad(index) {
      if (this.isFormUnidad(this.unidades[index])) {
        const unidad = this.unidades[index];
        unidad.especialidad_id = this.especialidadId;

        fetch("http://127.0.0.1:8000/api/unidad_didactica", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(unidad),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data.unidad_didactica);
            unidad.id_unidad = data.unidad_didactica;

            this.unidades[index].show = true;
            this.unidades[index].guardando = true;
            // alert(`Unidad ${index + 1} guardada. ID: ${data.unidad_didactica}`);
            this.alert_save(`Unidad ${index + 1} guardada.`, "success");
          })
          .catch((error) => {
            console.error("Error al guardar la unidad:", error);
            //alert("Error al guardar la unidad.");
            this.alert_save("Error al guardar la unidad.", "error");
          });
      } else {
        this.alert_save_btn(
          "No pudes enviar campos vacios!",
          "complete todos los campos por favor.",
          "error"
        );
        //alert('Por favor, complete todos los campos antes de enviar el formulario.');
      }
    },
    agregarIndicadorLogro(index) {
      this.unidades[index].indicadoresLogro.push({
        indicador: "",
        guardado: false,
        id_indicador: -1,
      });
    },
    actualizarIndicadorLogro(index, ilIndex, id_indicador) {
      const data_in = {
        descripcion: this.unidades[index].indicadoresLogro[ilIndex].indicador,
        unidad_didactica_id : this.unidades[index].id_unidad
      }
      return fetch(`http://127.0.0.1:8000/api/indicador_logro/${id_indicador}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_in),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al actualizado el Indicador de Logro");
          }
          Swal.fire(
            "Actualizado!",
            "El Indicador de Logro ha sido actualizado.",
            "success"
          );
        })
        .catch((error) => {
          Swal.fire("Error", error.message, "error");
        });
    },
    eliminarIndicadorLogro(index, ilIndex, id_indicador) {
      if (this.unidades[index].indicadoresLogro[ilIndex].guardado) {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "No podrás revertir esto! ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminarlo!",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return fetch(`http://127.0.0.1:8000/api/indicador_logro/${id_indicador}`, {
              method: "DELETE",
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error al eliminar el Indicador de Logro");
                }
                this.unidades[index].indicadoresLogro.splice(ilIndex, 1);
                Swal.fire(
                  "Eliminado!",
                  "El Indicador de Logro ha sido eliminado.",
                  "success"
                );
              })
              .catch((error) => {
                Swal.fire("Error", error.message, "error");
              });
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      } else {
        this.unidades[index].indicadoresLogro.splice(ilIndex, 1);
      }
    },

    guardarIndicador(index, ilIndex) {
      const indicador = {
        descripcion: this.unidades[index].indicadoresLogro[ilIndex].indicador,
        unidad_didactica_id: this.unidades[index].id_unidad,
      };

      console.log(indicador);

      if (!indicador.unidad_didactica_id) {
        // alert("Primero guarda la unidad.");
        this.alert_save("Primero guarda la unidad.", "success");
        return;
      }

      fetch("http://127.0.0.1:8000/api/indicador_logro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(indicador),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          this.alert_save(`Indicador ${ilIndex + 1} guardado.`, "success");
          this.unidades[index].indicadoresLogro[ilIndex].guardado = true;
          this.unidades[index].indicadoresLogro[ilIndex].id_indicador = data.indicador;
          console.log(this.unidades[index].indicadoresLogro[ilIndex]);
        })
        .catch((error) => {
          console.error("Error al guardar el indicador:", error);
          this.alert_save(
            "Error al guardar el indicador. Verifica la URL y el método HTTP.",
            "success"
          );
        });
    },
  },
};
</script>

<style scoped>
/* Estilos del componente */
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap");

.title,
.subtitle {
  color: #921733;
  margin: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
}

.header-container {
  margin-bottom: 20px;
}

.controlador-container {
  width: 450px;

  position: absolute;
  top: 1px;
  right: 10px;
  padding: 10px;
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
}
.controlador-container .controlador-content {
  display: flex;
  justify-content: space-between;
}

.controlador-title {
  margin: 0 0 5px 0;
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
  font-family: "Montserrat", sans-serif;
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
.add-btn {
  position: fixed;
  top: 130px;
  right: 10%;
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
  font-family: "Montserrat", "sans-serif";
  font-weight: 600;
}

.data-table td input,
.data-table td select,
.data-table td textarea {
  width: calc(100% - 16px);
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Montserrat", sans-serif;
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
