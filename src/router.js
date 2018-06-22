import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Callback from './views/Callback.vue';
import Choose from './views/Choose.vue';
import Play from './views/Play.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/callback',
            name: 'callback',
            component: Callback
        },
        {
            path: '/choose',
            name: 'choose',
            component: Choose
        },
        {
            path: '/play',
            name: 'play',
            component: Play
        }
    ],
    mode: 'history'
});
