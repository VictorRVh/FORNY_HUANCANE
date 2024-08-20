<template>
  <div class="modal" tabindex="-1" role="dialog" :class="{ show: showModal }">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title text-center w-100">
            {{ editMode ? "Editar Docente" : "Registrar Docente" }}
          </h4>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>

        <!-- Form -->
        <Form @submit="submitDocente">
          <!-- Modal Body -->
          <div class="modal-body">
            <div class="input-group mb-3">
              <label for="nombre" class="input-group-text">Nombre</label>
              <Field
                type="text"
                class="form-control"
                id="nombre"
                v-model="docente.nombre"
                placeholder="Nombre completo del Docente"
                name="nombre"
                :rules="'required|word'"
              />
              <ErrorMessage name="nombre" class="error_required" />
            </div>

            <div class="input-group mb-3">
              <label for="apellido_paterno" class="input-group-text">Apellido Paterno</label>
              <Field
                type="text"
                class="form-control"
                id="apellido_paterno"
                v-model="docente.apellido_paterno"
                placeholder="Apellido Paterno"
                name="apellido_paterno"
                :rules="'required|word'"
              />
              <ErrorMessage name="apellido_paterno" class="error_required" />
            </div>

            <div class="input-group mb-3">
              <label for="apellido_materno" class="input-group-text">Apellido Materno</label>
              <Field
                type="text"
                class="form-control"
                id="apellido_materno"
                v-model="docente.apellido_materno"
                placeholder="Apellido Materno"
                name="apellido_materno"
                :rules="'required|word'"
              />
              <ErrorMessage name="apellido_materno" class="error_required" />
            </div>

            <div class="input-group mb-3">
              <label for="dni" class="input-group-text">DNI</label>
              <Field
                type="text"
                class="form-control"
                id="dni"
                v-model="docente.dni"
                placeholder="DNI del docente"
                name="dni"
                :rules="'required|dni'"
              />
              <ErrorMessage name="dni" class="error_required" />

              <label for="celular" class="input-group-text">Celular</label>
              <Field
                type="text"
                class="form-control"
                id="celular"
                v-model="docente.celular"
                placeholder="Número de celular"
                name="celular"
                :rules="'required|celular'"
              />
              <ErrorMessage name="celular" class="error_required celular_error" />
            </div>

            <div class="input-group mb-3">
              <label for="correo" class="input-group-text">Correo</label>
              <Field
                type="email"
                class="form-control"
                id="correo"
                v-model="docente.correo"
                placeholder="Correo electrónico"
                name="correo"
                :rules="'required|email'"
              />
              <ErrorMessage name="correo" class="error_required" />
            </div>

            <div class="input-group mb-3">
              <label for="sexo" class="input-group-text">Sexo</label>
              <Field
                as="select"
                class="form-select form-control"
                id="sexo"
                v-model="docente.sexo"
                name="sexo"
                :rules="'required|sexo'"
              >
                <option value="" disabled>Seleccionar</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </Field>
              <ErrorMessage name="sexo" class="error_required" />

              <label for="birthdate" class="input-group-text">F. Nacimiento</label>
              <Field
                type="date"
                class="form-control"
                id="birthdate"
                v-model="docente.fecha_nacimiento"
                name="fecha_nacimiento"
                :rules="'required|fecha_nacimiento'"
              />
              <ErrorMessage name="fecha_nacimiento" class="error_required fecha_error" />
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer d-flex justify-content-center w-100">
            <button type="button" class="btn btn-primary" @click="closeModal">
              Cerrar
            </button>
            <button type="submit" class="btn btn-success">
              {{ editMode ? "Actualizar" : "Guardar" }}
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import Swal from "sweetalert2";

export default {
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    editMode: {
      type: Boolean,
      default: false, // false para agregar, true para editar
    },
    docenteToEdit: {
      type:Object,
      default: null
    }
  },
  data() {
    return {
      docente: {
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        dni: "",
        sexo: "",
        celular: "",
        correo: "",
        fecha_nacimiento: "",
      },
    };
  },
  mounted() {
    /*
    if (this.editMode && this.docenteToEdit) {
      this.docente = { ...this.docenteToEdit };
    }
      */
     if(this.docenteToEdit){
        console.log("Editar",this.docenteToEdit)
        this.docente.nombre =   this.docenteToEdit.nombre;
        this.docente.apellido_paterno = this.docenteToEdit.apellido_paterno ;
        this.docente.apellido_materno = this.docenteToEdit.apellido_materno;
        this.docente.dni = this.docenteToEdit.dni;
        this.docente.sexo = this.docenteToEdit.sexo;
        this.docente.celular = this.docenteToEdit.celular;
        this.docente.correo = this.docenteToEdit.correo;
        this.docente.fecha_nacimiento = this.docenteToEdit.fecha_nacimiento;
     }
     else{
       console.log("crear")
     }
  },
  methods: {
    submitDocente() {
      const url = this.editMode
        ? `http://127.0.0.1:8000/api/teacher/${this.docenteToEdit.dni}`
        : "http://127.0.0.1:8000/api/teacher";
      const method = this.editMode ? "PUT" : "POST";
      
      console.log("DATOS ENVIADOS",this.docente)

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.docente),
      })
        .then((response) => response.json())
        .then((datosRespuesta) => {
          console.log(datosRespuesta);
          this.alert_save();
          this.docente = {
            nombre: "",
            apellido_paterno: "",
            apellido_materno: "",
            dni: "",
            sexo: "",
            celular: "",
            correo: "",
            fecha_nacimiento: "",
          };
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
        });
    },
    alert_save() {
      Swal.fire({
        position: "center",
        icon: "success",
        title: this.editMode?"Elemento Actulizado":"Elemento Creado",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
.error_required {
  color: red;
  font-size: 0.8em;
  margin-top: 34px;
  
}
.celular_error,.fecha_error{

  margin-right: 30px;
 
  width: 80%;
  text-align: end;
}
</style>
