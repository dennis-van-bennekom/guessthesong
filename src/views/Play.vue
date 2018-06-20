<template>
    <div>
        <ul>
            <li v-for="playlist in playlists">
                <a href="#" @click="select(playlist)">{{ playlist.name }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'play',
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (!vm.$store.state.accessToken) {
                    vm.$router.push({ name: 'home' });
                }
            });
        },
        computed: {
            ...mapState({
                playlists: state => state.playlists
            })
        },
        mounted() {
            this.getFeaturedPlaylists();
        },
        methods: {
            ...mapActions([
                'getFeaturedPlaylists',
                'select'
            ])
        }
    }
</script>
