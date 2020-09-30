import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Av from '@/main'

require('./styles/app.scss')

const app = createApp(App)

app.use(router)
app.use(Av)

app.mount('#app')
