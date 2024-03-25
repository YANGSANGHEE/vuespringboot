import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
//use 랑 mount랑 바꿔줌(순서 차이인거 같기도함)
app.use(router); //router
app.use(store); //store
app.mount('#app');
