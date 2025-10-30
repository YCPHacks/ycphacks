import './assets/main.css'

// main.js or main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store.js';
import {library} from '@fortawesome/fontawesome-svg-core';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
<<<<<<< HEAD
import 'bootstrap-icons/font/bootstrap-icons.css';
import{
    faTimes,
    faCheck,
    faCircle,
    faMinus
} from '@fortawesome/free-solid-svg-icons';
=======
>>>>>>> parent of 6b1dcfe... #5: Added color/symbols to hardware tabs for dropdowns

import BootstrapVue3 from 'bootstrap-vue-3';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTimes, faCheck, faCircle, faMinus);

const app = createApp(App);
app.use(BootstrapVue3);
app.use(router)
app.use(store);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
