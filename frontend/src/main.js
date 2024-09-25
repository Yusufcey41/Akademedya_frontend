import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.js'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import axios from './axios-config'

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)

app.config.globalProperties.$axios = axios
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
