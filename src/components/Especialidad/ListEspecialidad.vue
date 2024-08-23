<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-primary">ESPECIALIDADES</h1>
      <div class="d-flex">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Buscar por Programa de Estudio"
          class="form-control me-2"
        />
        <router-link class="" to="/Especialidad/Add">
          <button class="btn btn-primary">Agregar Especialidad</button>
        </router-link>
      </div>
    </div>
    <div v-if="filteredEspecialidades.length">
      <div class="row">
        <div
          v-for="(especialidad, index) in filteredEspecialidades"
          :key="index"
          class="col-md-4 mb-4"
        >
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title text-secondary">
                {{ especialidad.programa_estudio }}
              </h2>
              <div class="card-text">
                <p><strong>Docente:</strong> {{ especialidad.docente_id }}</p>
                <p>
                  <strong>Ciclo Formativo:</strong> {{ especialidad.ciclo_formativo }}
                </p>
                <p><strong>Total de Horas:</strong> {{ especialidad.hora_semanal }}</p>
                <p><strong>Modalidad:</strong> {{ especialidad.modalidad }}</p>
                <p>
                  <strong>Descripción:</strong>
                  {{ especialidad.descripcion_especialidad }}
                </p>
                <p>
                  <strong>Periodo Académico:</strong> {{ especialidad.periodo_academico }}
                </p>
                <p><strong>Sección:</strong> {{ especialidad.seccion }}</p>
                <div class="form-group half-width">
                  <label for="sexo" class="form-label"><strong>Turno</strong></label>
                  <select v-model="especialidad.turno" id="sexo" class="form-select" required>
                    <option value="M" >Mañana</option>
                    <option value="T">Tarde</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <button
                class="btn btn-success me-2"
                @click="imprimirNomina(index, 'normal')"
              >
                Nómina Normal
              </button>
              <button
                class="btn btn-success me-2"
                @click="imprimirNominaUgel(index, 'ugel')"
              >
                Nómina UGEL
              </button>
              <button class="btn btn-warning me-2" @click="editarEspecialidad(index)">
                <icono icon="edit" />
              </button>
              <button
                class="btn btn-outline-primary"
                @click="eliminarEspecialidad(especialidad.id_unidad)"
              >
                <icono icon="trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No hay especialidades registradas.</p>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

import { generateNominaPDF, reporteNominaUgel } from "../pdf/generatePdf";

export default {
  data() {
    return {
      especialidades: [],
      searchTerm: "", // Valor para el término de búsqueda
      imprime_turno: [],
    };
  },
  computed: {
    filteredEspecialidades() {
      return this.especialidades.filter((especialidad) =>
        especialidad.programa_estudio
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    fetchEspecialidades() {
      const url = `http://127.0.0.1:8000/api/especialidad`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.especialidades = data.especialidades;
          this.especialidades.forEach((espe) => {
            espe.turno = "M"; // Agrega el atributo "turno" a cada objeto en this.especialidades
          });
        })
        .catch((error) => {
          console.error("Error fetching especialidades:", error);
        });
    },
    editarEspecialidad(index) {
      alert(
        `Editando especialidad: ${this.filteredEspecialidades[index].programa_estudio}`
      );
    },
    eliminarEspecialidad(index) {
      Swal.fire({
          title: "¿Estás seguro?",
          text: "No podrás revertir esto! ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminarlo!",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return fetch(`http://127.0.0.1:8000/api/especialidad/${index}`, {
              method: "DELETE",
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error al eliminar el Especialidad");
                }
               
                this.fetchEspecialidades();

                Swal.fire("Eliminado!", "La especialidad ha sido eliminado.", "success");
              })
              .catch((error) => {
                Swal.fire("Error", error.message, "error");
              });
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      //  
      
    },
    agregarEspecialidad() {
      this.$router.push({ name: "nomina" });
    },
    async imprimirNomina(index, formato) {
      const especialidadId = this.filteredEspecialidades[index].programa_estudio;

      // CHIVICTOR EN ESTE CASO ESTA HACIENDO LA CONSULTA SOLO PARA TURNO TARDE, CUANDO HAYA LOS BOTONES YA LO CAMBIAS
      const especialidadTurno = this.filteredEspecialidades[index].turno;

      const url = `http://127.0.0.1:8000/api/especialidad/${especialidadId}/estudiantes/${especialidadTurno}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        generateNominaPDF(data);
      } catch (error) {
        console.error("Error fetching estudiantes:", error);
      }
    },
    async imprimirNominaUgel(index, formato) {
      const especialidadId = this.filteredEspecialidades[index].programa_estudio;
      const url = `http://127.0.0.1:8000/api/registro/estudiantes/${especialidadId}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        reporteNominaUgel(data);
      } catch (error) {
        console.error("Error fetching estudiantes:", error);
      }
    },
  },
  mounted() {
    this.fetchEspecialidades(); // Cargar especialidades cuando el componente se monta
  },
};
</script>

<style scoped>
.container {
  overflow-y: scroll;
  height: 80vh;
}
h1 {
  color: #007bff;
  font-size: 1.8rem;
  font-weight: bold;
}

.card-title {
  font-size: 1.5rem;
  color: #343a40;
}

.card-footer {
  background-color: #f8f9fa;
}
</style>
