import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', component: resolve => require(['@/login/login'],resolve)},
        {path: '/home', component: resolve => require(['@/home/home'],resolve)},
        {path: '/add', component: resolve => require(['@/add/add'],resolve)},
        {path: '/look/:id', component: resolve => require(['@/look/look'],resolve)}
    ]
})