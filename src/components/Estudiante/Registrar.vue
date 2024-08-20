<template>
  <div class="container">
    <h2 class="form-title">Registrar estudiante</h2>

    <form @submit.prevent="submitestudiante" class="form">
      <!-- Nombre -->
      <div class="form-row">
        <div class="form-group full-width">
          <label for="nombre" class="form-label">Nombre</label>
          <input v-model="estudiante.nombre" type="text" id="nombre" class="form-input" placeholder="Nombre completo del estudiante" required />
        </div>
      </div>

      <!-- Apellido Paterno -->
      <div class="form-row">
        <div class="form-group full-width">
          <label for="apellidoPaterno" class="form-label">Apellido Paterno</label>
          <input v-model="estudiante.apellido_paterno" type="text" id="apellidoPaterno" class="form-input" placeholder="Apellido Paterno" required />
        </div>
      </div>

      <!-- Apellido Materno -->
      <div class="form-row">
        <div class="form-group full-width">
          <label for="apellidoMaterno" class="form-label">Apellido Materno</label>
          <input v-model="estudiante.apellido_materno" type="text" id="apellidoMaterno" class="form-input" placeholder="Apellido Materno" />
        </div>
      </div>

      <!-- DNI y Sexo -->
      <div class="form-row">
        <div class="form-group half-width">
          <label for="dni" class="form-label">DNI</label>
          <input v-model="estudiante.dni" type="text" id="dni" class="form-input" placeholder="DNI del estudiante" required />
        </div>

        <div class="form-group half-width">
          <label for="sexo" class="form-label">Sexo</label>
          <select v-model="estudiante.sexo" id="sexo" class="form-select" required>
            <option value="">Seleccionar</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
      </div>

      <!-- Celular y Correo -->
      <div class="form-row">
        <div class="form-group half-width">
          <label for="celular" class="form-label">Celular</label>
          <input v-model="estudiante.celular" type="text" id="celular" class="form-input" placeholder="Número de celular" />
        </div>

        <div class="form-group half-width">
          <label for="correo" class="form-label">Correo</label>
          <input v-model="estudiante.correo" type="email" id="correo" class="form-input" placeholder="Correo electrónico" required />
        </div>
      </div>

      <button type="submit" class="form-button">Registrar estudiante</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      estudiante: {
        id: '', // Este campo se llenará con el ID generado por la base de datos después de la creación.
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        dni: '',
        sexo: '',
        celular: '',
        correo: ''
      }
    };
  },
  methods: {
    async submitestudiante() {
      try {
        console.log(this.estudiante); // Verifica los datos antes de la solicitud
        const response = await fetch('http://127.0.0.1:8000/api/teacher                                                                                                                                              ', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.estudiante)
      });


        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.message || 'Error desconocido al registrar el estudiante';
          throw new Error(errorMessage); // Lanzar el mensaje de error para el catch
        }

        const result = await response.json();
        console.log(result); // Verifica la respuesta del backend
        this.estudiante.id = result.id;

        // Limpiar el formulario
        this.estudiante = {
          id: '',
          nombre: '',
          apellido_paterno: '',
          apellido_materno: '',
          dni: '',
          sexo: '',
          celular: '',
          correo: ''
        };

        alert('estudiante registrado exitosamente');
      } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}`); // Mostrar el mensaje de error en lugar del objeto
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  color: #921733;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  margin-bottom: 15px;
}

.form-group {
  margin-right: 15px;
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  flex: 1;
}

.form-group.half-width {
  flex: 1;
}

.form-group:last-child {
  margin-right: 0;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #2c3e50;
}

.form-input, .form-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-button {
  background-color: #921733;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-button:hover {
  background-color: #800f2c;
}
</style>
