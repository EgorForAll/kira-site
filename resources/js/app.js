import './bootstrap';
import {createApp} from "vue/dist/vue.esm-bundler.js";
import {createRouter, createWebHistory} from "vue-router";
import App from "./components/app/App.vue"
import Home from "./components/pages/Home.vue"
import Auth from "./components/pages/Auth.vue";
import Register from "./components/pages/Register.vue";
import Admin from "./components/pages/Admin.vue";
import NotFound from "./components/pages/NotFound.vue";
import NotAdmin from "./components/pages/NotAdmin.vue";
import Reset from "./components/pages/Reset.vue";
import ChangePassword from "./components/pages/ChangePassword.vue";
import "../css/app.css"
import "../scss/main.scss"
import store from "./store/index.js"
import axios from "./axios/index.ts";

const router = createRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/auth',
            name: 'auth',
            component: Auth
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin
        },
        {
            path: "/reset-password",
            name: 'reset',
            component: Reset
        },
        {
            path: "/change-password",
            name: 'change',
            component: ChangePassword
        },
        {
            path: "/:catchAll(.*)",
            name: 'notFound',
            component: NotFound
        },
        {
            path: "/403",
            name: 'notAdmin',
            component: NotAdmin
        }
    ],
    history: createWebHistory()
})

async function fetchAdmin() {
    const request = await fetch('http://127.0.0.1:8000/laravel_route/admin').then((res) => res.json())
    return request.success
}

async function fetchUser() {
    const request = await fetch('http://127.0.0.1:8000/laravel_route/admin').then((res) => res.json())
    return request.success
}


router.beforeEach(async (to) => {
    const isAdmin = await fetchAdmin();
    if (!isAdmin && to.name === 'admin') {
        return {name: 'notAdmin'}
    }
})

const app = createApp({
    components: {
        App
    },
});

app.use(store)
app.use(router)
app.use(axios, {
    baseUrl: 'http://127.0.0.1:8000',
})
app.mount('#app');

