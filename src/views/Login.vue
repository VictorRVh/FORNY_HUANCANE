<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2"; // Importar SweetAlert2
import { useUserStore } from '@/stores/userStore'; // Asegúrate de que la ruta sea correcta

const username = ref("");
const password = ref("");

const router = useRouter();
const userStore = useUserStore(); // Obtener el store de usuario

async function handleLogin() {
  try {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        dni: username.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = "Error en la autenticación. Intente nuevamente.";
      if (data.errors) {
        if (data.errors.dni) {
          errorMessage = data.errors.dni[0];
        } else if (data.errors.password) {
          errorMessage = data.errors.password[0];
        } else if (data.errors.login) {
          errorMessage = data.errors.login[0];
        }
      }

      // Mostrar error con SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // Si la autenticación fue exitosa
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: "Inicio de sesión exitoso",
      timer: 1500, // Tiempo en milisegundos antes de cerrar automáticamente
      showConfirmButton: false, // Ocultar el botón de confirmación
    }).then(() => {
      userStore.login({ username: username.value, password: password.value }); // Guardar los datos del usuario en el store
      router.push({ name: 'home' }); // Redirige al home
    });
  } catch (error) {
    // Manejar error con SweetAlert2
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error en la autenticación. Intente nuevamente.",
      confirmButtonText: "Aceptar",
    });
  }
}
</script>

<template>
  <div class="container-fluid vh-100 d-flex align-items-center justify-content-center">
    <div class="row w-100">
      <!-- Sección Izquierda -->
      <div
        class="col-md-8 bg-light d-flex flex-column justify-content-center align-items-center"
      >
        <div class="position-absolute top-0 start-0 p-3">
          <h2 class="text-muted">Intranet</h2>
        </div>
        <div class="text-center">
          <h1 class="display-4 fw-light mb-3">CEPRO HUANCANÉ</h1>
          <img
            src="/img/logoTwo.png"
            alt="CEPRO HUANCANÉ"
            class="img-fluid"
            style="width: 40%"
          />
        </div>
      </div>

      <!-- Sección Derecha -->
      <div class="col-md-4 d-flex flex-column justify-content-center p-5">
        <h2 class="mb-4 text-center">BIENVENIDO</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <input
              v-model="username"
              type="text"
              class="form-control"
              placeholder="Usuario"
              required
            />
          </div>
          <div class="mb-3">
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Contraseña"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Ingresar</button>
        </form>
        <a href="#" class="d-block text-center mt-3 text-muted">¿No tienes una cuenta?</a>
        <div class="text-center mt-4 text-muted">
          Al hacer click, usted acepta nuestros
          <strong class="text-decoration-underline">Términos de Servicio</strong> y
          <strong class="text-decoration-underline">Políticas de Privacidad</strong>.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-light {
  background-color: #f8f8fa !important;
  height: 100vh;
}

h2,
h1 {
  color: #262d3d;
}

h1.display-4 {
  font-weight: 300;
}

.text-muted {
  opacity: 0.6;
}

form .form-control {
  border: none;
  border-bottom: 2px solid #ccc;
  border-radius: 0;
  font-weight: 200;
  outline: none;
}

form .form-control:focus {
  box-shadow: none;
}

.text-decoration-underline {
  font-weight: 400;
}
</style>
