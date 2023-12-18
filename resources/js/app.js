import './bootstrap';
import {createApp} from "vue/dist/vue.esm-bundler.js";
import {createRouter, createWebHistory} from "vue-router";
import App from "./components/app/App.vue"
import Home from "./components/pages/Home.vue"
import Auth from "./components/pages/Auth.vue";
import Register from "./components/pages/Register.vue";
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
        }
    ],
    history: createWebHistory()
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

