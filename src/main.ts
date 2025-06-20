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

// Solo en desarrollo, habilitar devtools
if (import.meta.env.DEV) {
  // Esto permite que Pinia aparezca en Vue DevTools
  pinia.use(({ store }) => {
    store.$id = store.$id
  })
}

app.use(pinia)
app.use(createBootstrap())
app.mount('#app')