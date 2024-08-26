import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import icono from './components/icons/icono';
import './assets/custom.scss';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import { localize } from '@vee-validate/i18n';


//  para la autenticación
import { createPinia } from 'pinia';


// Define las reglas manualmente
defineRule('required', (value) => {
    if (!value || !value.length) {
        return `Este campo es obligatorio`;
    }
    if (/^\s+$/.test(value)) {
        return 'Este campo no puede contener solo espacios';
    }
    return true;
});

// Regla para 'codigo_estudiante' (código numérico de 9 dígitos)
defineRule('codigo_estudiante', (value) => {
    const codigoPattern = /^[0-9]{9}$/;
    if (!codigoPattern.test(value)) {
        return 'Este campo debe ser un código numérico de 9 dígitos';
    }
    return true;
});

// Regla para 'nombre', 'apellido_paterno' y 'apellido_materno' (solo letras y estar consecutivas)
defineRule('word', (value) => {
    const wordExp = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ]+(\s[a-zA-ZáéíóúÁÉÍÓÚüÜ]+)*\s*$/;
    if (!wordExp.test(value)) {
        return 'Este campo debe contener solo palabras y estar consecutivas';
    }
    return true;
});

// Regla para 'dni' (número de 8 dígitos)
defineRule('dni', (value) => {
    const dniPattern = /^[0-9]{8}$/;
    if (!dniPattern.test(value)) {
        return 'Digite un número de 8 dígitos';
    }
    return true;
});

// Regla para 'sexo' (debe ser 'M' o 'F')
defineRule('sexo', (value) => {
    const sexoPattern = /^(M|F)$/;
    if (!sexoPattern.test(value)) {
        return 'Este campo debe ser "M" o "F"';
    }
    return true;
});

// Regla para 'celular' (número de 9 dígitos)
defineRule('celular', (value) => {
    const celularPattern = /^[0-9]{9}$/;
    if (!celularPattern.test(value)) {
        return 'Digite un número de 9 dígitos';
    }
    return true;
});

// Regla par 'números" 
defineRule('numeric', (value) => {
    // Patrón que asegura que el valor sea numérico
    const numericPattern = /^[0-9]+$/;
    if (!numericPattern.test(value)) {
        return 'El campo debe contener solo números';
    }
    return true;
});

// Regla para 'correo' (correo electrónico válido)
defineRule('email', (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
        return 'Este campo debe ser un correo electrónico válido';
    }
    return true;
});

// Regla para 'fecha_nacimiento' (fecha válida)
defineRule('fecha_nacimiento', (value) => {
    const fechaPattern = /^\d{4}-\d{2}-\d{2}$/; // Formato YYYY-MM-DD
    if (!fechaPattern.test(value)) {
        return 'Este campo debe ser una fecha válida en el formato YYYY-MM-DD';
    }

    const fechaNacimiento = new Date(value);
    const hoy = new Date();

    // Calcular la diferencia en años
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    // Ajustar la edad si aún no ha cumplido años este año
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    if (edad < 18) {
        return 'Debes tener al menos 18 años';
    }

    return true;
});


// Configura los mensajes de error
configure({
    generateMessage: localize('en', {
        messages: {
            required: '{field} is required',
            codigo_estudiante: 'Invalid code',
            word: 'Invalid word',
            dni: 'Invalid DNI',
            sexo: 'Invalid gender',
            celular: 'Invalid phone number',
            email: 'Invalid email',
            fecha_nacimiento: 'Invalid date',
        },
    }),
});


library.add({...icono});

const app = createApp(App);


//pinia para autenticacion de estados
const pinia = createPinia();
app.use(pinia);


app.use(router);
app.component('icono', FontAwesomeIcon);
app.component('Field', Field);
app.component('Form', Form);
app.component('ErrorMessage', ErrorMessage);  // Agrega esto

// SWEETALERT
app.config.globalProperties.$swal = Swal;

app.mount('#app');
