import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// CSS imports
import '../css/main.css'
import '../css/header.css'
import '../css/main-banner.css'
import '../css/main-banner-eng.css'
import '../css/review.css'
import '../css/reservation.css'
import '../css/reservation-eng.css'
import '../css/display-1.css'
import '../css/display1-en.css'
import '../css/display-2.css'
import '../css/display2-en.css'
import '../css/activity.css'
import '../css/kdh.css'
import '../css/info.css'
import '../css/info-eng.css'
import '../css/footer.css'
import '../css/footer-eng.css'
import '../css/modal.css'
import '../css/modal-eng.css'
import '../css/hy-header.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
