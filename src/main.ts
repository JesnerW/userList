import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createBootstrap } from 'bootstrap-vue-next'
import App from './App.vue'


// Importar CSS de Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(createBootstrap())
app.mount('#app')