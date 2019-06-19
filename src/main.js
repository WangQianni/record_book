import Vue from 'vue';
import Mini from 'mint-ui';

Vue.use(Mini);

import router from './routes/index';
import store from './store/index';
import App from './App';

import './assets/css/base.css';
import './assets/css/normalize.css';
import 'mint-ui/lib/style.css';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})