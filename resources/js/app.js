import './bootstrap';
import {createApp} from "vue/dist/vue.esm-bundler.js";
import {createRouter, createWebHistory} from "vue-router";
import App from "./components/app/App.vue"
import Home from "./components/pages/Home.vue"
import Auth from "./components/pages/Auth.vue";
import "../css/app.css"
import "../scss/main.scss"
import store from "./store/index.js"

const router = createRouter({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/auth',
            component: Auth
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
app.mount('#app');

