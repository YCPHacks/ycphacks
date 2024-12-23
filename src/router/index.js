// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import Registration from '../views/Registration.vue';
import LoginPage from '../views/LoginPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: LandingPage,
    },
    {
        path: '/register',
        name: 'Register',
        component: Registration,
    },
    {
        path: '/login',
        name:'Login',
        component:LoginPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
