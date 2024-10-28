//引入createApp函数，创建应用实例
import { createApp } from 'vue'
//引入App根组件
import App from './App.vue'
//引入pinia
import { createPinia } from 'pinia'
//引入i18n
// import i18n from './i18n'

//创建应用
const app = createApp(App)
//创建pinia实例
const pinia = createPinia()
//挂载pinia实例
app.use(pinia)
//挂载i18n实例
// app.use(i18n)
//挂载应用
app.mount('#app')
