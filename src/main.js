import {createApp} from 'vue'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons';
import './style.css'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'

import VueWechatTitle from 'vue-wechat-title'

import naive from 'naive-ui'

// pinia
import {createPinia} from "pinia";
import piniaPersist from 'pinia-plugin-persist'
import router from "./router/index.js";

UIkit.use(Icons);


const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(naive)
app.use(VueWechatTitle)
app.mount('#app')

