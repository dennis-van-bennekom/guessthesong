import Vue from 'vue';
import Vuex from 'vuex';
import Spotify from 'spotify-web-api-js';

Vue.use(Vuex);

const spotify = new Spotify();

export default new Vuex.Store({
    state: {
        accessToken: '',
        loading: false,
        playlists: [],
        selected: null
    },
    mutations: {
        accessToken(state, accessToken) {
            state.accessToken = accessToken;
            spotify.setAccessToken(accessToken);
        },
        loading(state, isLoading) {
            state.loading = isLoading;
        },
        playlists(state, playlists) {
            state.playlists = playlists;
        },
        select(state, playlist) {
            state.selected = playlist;
        }
    },
    actions: {
        setAccessToken({ commit }, accessToken) {
            commit('accessToken', accessToken);
        },
        async getFeaturedPlaylists({ commit }) {
            commit('loading', true);

            const result = await spotify.getFeaturedPlaylists();

            commit('playlists', result.playlists.items);
            commit('loading', false);
        },
        select({ commit }, playlist) {
            commit('select', playlist);
        }
    }
});
