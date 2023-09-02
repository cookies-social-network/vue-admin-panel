import App from 'app/App.vue'
import router from 'app/router'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'

import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import 'app/styles/index.scss'

const app = createApp(App)

app.use(router)

app.use(ElementPlus)

app.mount('#app')
