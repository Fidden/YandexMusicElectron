import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store';
import router from './router/router';
import axios from 'axios';
import VueLazyLoad from 'vue-lazyload';
import { vue3Debounce } from 'vue-debounce';

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$request = axios.create({
	baseURL: 'https://api.music.yandex.net',
	headers: {
		'Accept-Language': 'ru',
		'Content-Type': 'application/json;charset=utf-8',
	},
});

app.provide('$request', axios.create({
	baseURL: 'https://api.music.yandex.net',
	headers: {
		'Accept-Language': 'ru',
		'Content-Type': 'application/json;charset=utf-8',
	},
}));

app.use(store);
app.use(router);
app.use(VueLazyLoad);
app.directive('debounce', vue3Debounce({ lock: true }));
app.mount('#app');
