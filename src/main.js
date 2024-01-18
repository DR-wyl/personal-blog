import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './util/i18n'
import initDirective from './plugin/initDirective'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(initDirective);

// app.use(ElementPlus);
app.use(router).use(i18n).mount('#app');

