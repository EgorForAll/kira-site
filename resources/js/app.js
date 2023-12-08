import './bootstrap';
import {createApp} from "vue/dist/vue.esm-bundler.js";
import App from "./components/App.vue"

const app = createApp({
    components: {
        App
    }
});

app.mount('#app');

