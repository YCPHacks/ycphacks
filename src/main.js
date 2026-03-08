import './assets/main.css'

// main.js or main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store.js';
import {library} from '@fortawesome/fontawesome-svg-core';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BootstrapVue3 from 'bootstrap-vue-3';
import axios from "axios";

// Axios interceptor to add the Token automatically
axios.interceptors.request.use((config) => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (cookie) {
        const token = cookie.split('=')[1];
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const app = createApp(App);
app.use(BootstrapVue3);
app.use(router)
app.use(store);
app.mount('#app');
