// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/store.js';
import LandingPage from '../views/LandingPage.vue';
import Registration from '../views/Registration.vue';
import LoginPage from '../views/LoginPage.vue';
import ActivitiesPage from '../views/ActivitiesPage.vue';
import HardwarePage from '../views/HardwarePage.vue';
import TeamsPage from '@/views/TeamsPage.vue';
import CategoriesPage from '../views/CategoriesPage.vue';
import CheckinPage from "@/views/CheckinPage.vue";
import PasswordRecoveryPage from "@/views/PasswordRecoveryPage.vue";
import PasswordLinkPage from "@/views/PasswordLinkPage.vue";
import EmailVerificationPage from "@/views/EmailVerification.vue";
import VerifyPage from "@/views/VerifyPage.vue";
import ProfilePage from "../views/ProfilePage.vue";

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
        path: '/checkin',
        name: 'Checkin',
        component: CheckinPage,
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
        path: '/categories',
        name: 'Categories',
        component: CategoriesPage,
    },
    {
        path: '/passwordRecovery',
        name: 'PasswordRecovery',
        component: PasswordRecoveryPage
    },
    {
        path: '/passwordLink',
        name: 'PasswordLink',
        component: PasswordLinkPage
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfilePage
    },
    {
        path: '/emailVerification',
        name:'EmailVerification',
        component: EmailVerificationPage
    },
    {
        path: '/pleaseVerify',
        name: 'PleaseVerify',
        component: VerifyPage
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

    const userEmailVerified = store.state.user?.isEmailVerified;

    // Allow routing to login if NOT authenticated
    if (to.path === '/login' || to.path === '/register' || to.path === '/passwordLink' || to.path  === '/passwordRecovery') {
        if (isAuthenticated) {
            return next('/'); // already logged in, redirect away
        } else {
            return next(); // allow login/register page
        }
    }

    if (isAuthenticated && !userEmailVerified) {
        if (to.path === '/emailVerification' || to.path === '/pleaseVerify' || to.path === '/' || to.path === '/profile') {
            return next();
        }
        return next('/emailVerification');
    }

    // For all other routes that require auth
    if (to.path !== '/' && !isAuthenticated)  {
        return next('/'); // redirect to landing page
    }

    next(); // allow route
});

export default router;
