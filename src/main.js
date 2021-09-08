import { createApp } from 'vue'
import App from './App.vue'
import router from './router'





let app = createApp(App)


app.config.globalProperties.API_URL = 'http://node2.blackseachain.com:8080'

app.use(router).mount('#app')








//createApp(App).use(router).mount('#app')
//app.config.globalProperties.$API_URL = 'http://node2.blackseachain.com:8080'



