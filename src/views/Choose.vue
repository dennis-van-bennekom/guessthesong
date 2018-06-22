<template>
    <div>
        <ul>
            <li v-for="playlist in playlists">
                <a href="#" @click.prevent="select(playlist)">{{ playlist.name }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    import spotify from '../spotify';

    export default {
        name: 'choose',
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (!spotify.getAccessToken()) {
                    vm.$router.push({ name: 'home' });
                }
            });
        },
        data() {
            return {
                playlists: []
            }
        },
        async mounted() {
            const { playlists } = await spotify.getFeaturedPlaylists();
            this.playlists = playlists.items;
        },
        methods: {
            select(playlist) {
                this.$router.push({ name: 'play', params: { selected: playlist } });
            }
        }
    }
</script>
