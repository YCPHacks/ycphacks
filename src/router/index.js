// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import Registration from '../views/Registration.vue';
import LoginPage from '../views/LoginPage.vue';
import ActivitiesPage from '../views/ActivitiesPage.vue';
import HardwarePage from '../views/HardwarePage.vue';
import HAvailabilityPage from '../views/HAvailabilityPage.vue'

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
    {
        path: '/activities',
        name: 'Activities',
        component: ActivitiesPage,
    },
    {
        path: '/hardware',
        name: 'Hardware',
        component: HardwarePage,
    },
    {
        path: '/hardwareAvailability',
        name: 'Hardware Availability',
        component: HAvailabilityPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
