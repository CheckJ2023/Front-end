import { createApp } from 'vue'



import './style.css'

import App from './App.vue'
import vuerouter from './vuerouter'

const app = createApp(App);

//5.將vue-router設定到vue APP內

app.use(vuerouter.router);

app.mount('#app');
