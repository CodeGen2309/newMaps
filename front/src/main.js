import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vueCookies from 'vue-cookies'


import Orion from '@orion.ui/orion'; // Import library
import '@orion.ui/orion/dist/style.css'; // Import styles
// import '@orion.ui/orion/dist/monkey-patching'; // Import Monkey Patching definition file



const app = createApp(App)

app.use(router)
app.use(vueCookies)
app.use(Orion)
app.mount('#app')
