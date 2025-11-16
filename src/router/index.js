// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/store.js';
import LandingPage from '../views/LandingPage.vue';
import Registration from '../views/Registration.vue';
import LoginPage from '../views/LoginPage.vue';
import ActivitiesPage from '../views/ActivitiesPage.vue';
import HardwarePage from '../views/HardwarePage.vue';
import TeamsPage from '@/views/TeamsPage.vue';

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
        path: '/teams',
        name: 'Team',
        component: TeamsPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: LandingPage // Should be replaced with the profile component once it is implemented
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    let isAuthenticated = !!store.state.user;
    if (!isAuthenticated) {
        const result = await store.dispatch('validateWithToken');
        isAuthenticated = result.success;
    }

    // Allow routing to login if NOT authenticated
    if (to.path === '/login' || to.path === '/register') {
        if (isAuthenticated) {
            return next('/'); // already logged in, redirect away
        } else {
            return next(); // allow login/register page
        }
    }

    // For all other routes that require auth
    if (to.path !== '/' && !isAuthenticated) {
        return next('/'); // redirect to landing page
    }

    next(); // allow route
});

export default router;
