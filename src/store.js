import Vue from 'vue';
import Vuex from 'vuex';
import Spotify from 'spotify-web-api-js';

Vue.use(Vuex);

const spotify = new Spotify();
window.spotify = spotify;

export default new Vuex.Store({
    state: {
        accessToken: ''
    },
    mutations: {
        setAccessToken (state, accessToken) {
            state.accessToken = accessToken;
            spotify.setAccessToken(accessToken);
        }
    },
    actions: {
        setAccessToken ({ commit }, accessToken) {
            commit('setAccessToken', accessToken);
        }
    }
});
