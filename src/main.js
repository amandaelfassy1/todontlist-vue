import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import "toastify-js/src/toastify.css"
import axios from 'axios'

if(window.localStorage.getItem("token")){
    axios.defaults.headers["Authorization"] = "Bearer " + window.localStorage.getItem("token");
}

createApp(App).use(store).use(router).mount('#app')
