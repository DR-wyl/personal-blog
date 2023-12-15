import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './util/i18n'
import initDirective from './plugin/initDirective'

const app = createApp(App);
app.use(initDirective);
app.use(router).use(i18n).mount('#app');
