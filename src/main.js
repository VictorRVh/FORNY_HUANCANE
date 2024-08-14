//import './assets/main.css'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import icono from './components/icons/icono'
import './assets/custom.scss';


import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';


  import { localize } from '@vee-validate/i18n';


  // Define las reglas manualmente
  defineRule('required', (value) => {
      if (!value || !value.length) {
          return `This field is required`; // Este campo es obligatorio
      }
      if (/^\s+$/.test(value)) {
          return 'This field cannot contain only spaces';
      }
      return true;
  });
  
  defineRule('codigo', (value) => {
      const emailPattern = /^[0-9]{3}\s*$/;
      if (!emailPattern.test(value)) {
          return 'This field must be a valid three digit number';//es campo debe ser u correo electrónico válido  -- this field must be a valid email
      }
      return true;
  });
  defineRule('word', (value) => {
      //console.log(value)
      const wordExp = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ]+(\s[a-zA-ZáéíóúÁÉÍÓÚüÜ]+)*\s*$/;
      //console.log(wordExp.test(value))
      if (!wordExp.test(value)) { // Cambio !value.match(wordExp)
          return 'Este campo debe contener solo palabras y estar consecutivas';
      }
      return true
  });
  
  // Configura los mensajes de error
  configure({
      generateMessage: localize('en', {
          messages: {
              required: '{field} is required',
              codigo: 'invalid code',
              word: 'invalid campo'
          },
      }),
  });


library.add({...icono})

const app = createApp(App)

app.use(router)
app.component('icono',FontAwesomeIcon);

app.component('Field', Field);
app.component('Form', Form);

/////SWEETALERT
app.config.globalProperties.$swal = Swal

app.mount('#app')



