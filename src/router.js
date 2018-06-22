import Vue from 'vue';
import Router from 'vue-router';
import spotify from './spotify';

import Home from './views/Home.vue';
import Callback from './views/Callback.vue';
import Choose from './views/Choose.vue';
import Play from './views/Play.vue';

Vue.use(Router);

const router = new Router({
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

router.beforeEach((to, from, next) => {
    if(['home', 'choose', 'play'].indexOf(to.name) > -1) {
        const accessToken = localStorage.getItem('accessToken');
        const timestamp = new Date(+localStorage.getItem('timestamp'));
        const hour = 60 * 60 * 1000;

        if (!spotify.getAccessToken() && accessToken && (Date.now() - timestamp < hour)) {
            spotify.setAccessToken(accessToken);
            router.push({ name: 'choose' });
        } else {
            if (!spotify.getAccessToken()) {
                router.push({ name: 'home' });
            }
        }
    }

    next();
});

export default router;