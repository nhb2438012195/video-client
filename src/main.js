import { createApp } from 'vue'
import App from './App.vue'
import "./tailMain.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router/index.js'
import { createPinia } from 'pinia'
import { useUserStore } from '@/store'
const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
app.component(key, component)
}

app.use(pinia)
app.use(router)
const userStore = useUserStore()
userStore.init()
app.mount('#app')
