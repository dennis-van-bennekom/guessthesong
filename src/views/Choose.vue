<template>
    <div class="choose">
        <section class="playlists">
            <h2>Featured playlists</h2>
            <ul>
                <li v-for="playlist in playlists" @click="select(playlist)">
                    <img :src="playlist.images[0].url" :alt="playlist.name + ' Image'">
                </li>
            </ul>
        </section>

        <section class="playlists">
            <h2>Own playlists</h2>
            <ul v-if="ownPlaylists.length">
                <li v-for="playlist in ownPlaylists" @click="select(playlist)">
                    <img :src="playlist.images[0].url" :alt="playlist.name + ' Image'">
                </li>
            </ul>
            <span class="no-playlists" v-else>You don't have any public playlists with more than 4 songs...</span>
        </section>
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
                playlists: [],
                ownPlaylists: []
            }
        },
        async mounted() {
            const { playlists } = await spotify.getFeaturedPlaylists();
            this.playlists = playlists.items;

            const result = await spotify.getUserPlaylists();
            this.ownPlaylists = result.items;
        },
        methods: {
            select(playlist) {
                this.$router.push({ name: 'play', params: { selected: playlist } });
            }
        }
    }
</script>

<style scoped>
    .choose {
        width: 100%;
        max-width: 50rem;
        margin: 0 auto;
        padding: 0 1rem 1rem;
    }

    h2 {
        text-align: center;
    }

    ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;

        list-style: none;
    }

    li {
        width: 25%;

        overflow: hidden;
        cursor: pointer;
    }

    img {
        display: block;
        width: 100%;

        transition: all 0.1s ease-in-out;
    }

    li:hover img {
        transform: scale(1.2);
    }

    @media screen and (max-width: 35rem) {
        li {
            width: 33.3333%;
        }
    }
</style>