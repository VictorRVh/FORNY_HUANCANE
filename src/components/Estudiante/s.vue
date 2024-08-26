<template>
    <div class="modal" tabindex="-1" role="dialog" :class="{ show: showModal }">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title text-center w-100">
              {{ editMode ? "Editar estudiante" : "Registrar estudiante" }}
            </h4>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
  
          <Form @submit="submitestudiante" ref="formRef">
            <div class="modal-body">
              <!-- Form Fields -->
              <!-- Tu código de campos de formulario -->
            </div>
            
            <div class="modal-footer d-flex justify-content-center w-100">
              <button type="button" class="btn btn-primary" @click="closeModal">Cerrar</button>
              <button type="submit" class="btn btn-success">
                {{ editMode ? "Actualizar" : "Guardar" }}
              </button>
              <button type="reset" @click="resetForm">Reset</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Form, Field, ErrorMessage, useForm } from "vee-validate";
  import Swal from "sweetalert2";
  
  export default {
    props: {
      showModal: { type: Boolean, required: true },
      editMode: { type: Boolean, default: false },
      estudianteToEdit: { type: Object, default: null },
    },
    data() {
      return {
        estudiante: {
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
    setup() {
      const { resetForm } = useForm();
  
      return {
        resetForm,
      };
    },
    mounted() {
      if (this.estudianteToEdit) {
        Object.assign(this.estudiante, this.estudianteToEdit);
      }
    },
    methods: {
      submitestudiante() {
        const url = this.editMode
          ? `http://127.0.0.1:8000/api/students/${this.estudianteToEdit.dni}`
          : "http://127.0.0.1:8000/api/students";
        const method = this.editMode ? "PUT" : "POST";
  
        fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.estudiante),
        })
          .then((response) => response.json())
          .then((datosRespuesta) => {
            this.alert_save();
            this.resetForm();
          })
          .catch((error) => {
            alert(`Error: ${error.message}`);
          });
      },
      resetForm() {
        this.$refs.formRef.resetForm();
        this.estudiante = {
          nombre: "",
          apellido_paterno: "",
          apellido_materno: "",
          dni: "",
          sexo: "",
          celular: "",
          correo: "",
          fecha_nacimiento: "",
        };
      },
      alert_save() {
        Swal.fire({
          position: "center",
          icon: "success",
          title: this.editMode ? "Elemento Actualizado" : "Elemento Creado",
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
  