import './bootstrap';
import {createApp} from "vue/dist/vue.esm-bundler.js";
import App from "./components/App.vue"
import "../css/app.css"
import "../scss/main.scss"
import store from "./store/index.js"

const app = createApp({
    components: {
        App
    },
});

app.use(store)
app.mount('#app');

