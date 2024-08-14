<template>
  <div class="app-container">
    <header>
      <h1>Gestión Académica</h1>
      <nav>
        <ul>
          <li @click="verEspecialidades">Especialidades</li>
          <li @click="verDocentes">Docentes</li>
          <li @click="matricula">Matricula</li>
          <li @click="estudiante">Registrar Estudiante</li>
        </ul>
      </nav>
    </header>
    <main>
      <div class="image-container">
        <img src="/img/imagen1.jpg" alt="Descripción 1" class="carousel-image">
        <div class="carousel-content">
          <h2>GESTION ACADEMICA CEPRO HUANCANÉ</h2>
          <p>Mejora la imagen de la institución educativa y su reconocimiento por parte de la sociedad; Aporta un mejor rendimiento financiero; Ofrece un mejor proceso de enseñanza-aprendizaje, con clases de mayor calidad; Fideliza a los alumnos, reduce el abandono y atrae a nuevos interesados, entre otros beneficios.</p>
        </div>
      </div>
      <div class="image-container">
        <img src="/img/imagen2.jpg" alt="Descripción 2" class="carousel-image">
        <div class="carousel-content">
          <h2>IMPORTANCIA</h2>
          <p> Es necesario crear notoriedad, una buena imagen y posicionamiento. Todo ello le permitirá ganar relevancia y diferenciación basándose en una propuesta de valor única. .</p>
        </div>
      </div>
      <!-- Agrega más imágenes según sea necesario -->
      <router-view></router-view> <!-- Aquí se mostrará el componente correspondiente a la ruta -->
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    verEspecialidades() {
      this.$router.push({ path: '/verEspecialidad' }); // Navegación programática
    },
    verDocentes() {
      this.$router.push({ path: '/verDocente' }); // Navegación programática
    },
    matricula() {
      this.$router.push({ path: '/Matricula' }); // Navegación programática
    },
    estudiante() {
      this.$router.push({ path: '/registroEstudiante' }); // Navegación programática
    },
    
    imprimirPDF() {
      alert('Imprimir PDF');
      // Aquí agregarás la lógica para imprimir en PDF
    },
  },
};
</script>

<style scoped>
.app-container {
  max-width: 90%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  color: #fff9fa;
  font-size: 3.5rem;
  font-weight: bold;
  text-align: left;
  flex: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Añade un sombreado para mayor visibilidad */
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 20px;
}

nav li {
  cursor: pointer;
  font-size: 1.4rem;
  color: #f2f2f2;
  font-weight: bold;
  padding: 12px 18px;
  transition: background-color 0.3s ease;
  border-radius: 4px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

nav li:hover {
  background-color: rgba(146, 23, 51, 0.2);
}

main {
  background-color: #fff;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.image-container {
  margin-bottom: 20px; /* Espacio entre imágenes */
}

.carousel-image {
  width: 100%;
  height: auto;
}

.carousel-content {
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente para el texto */
  padding: 20px;
  border-radius: 8px;
}

h2 {
  color: #921733;
  font-size: 2rem;
  margin-bottom: 15px;
}

p {
  font-size: 1.2rem;
}
</style>
