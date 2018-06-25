<template>
    <div class="choose">
        <section class="playlists">
            <h2 class="title">Featured playlists</h2>
            <ul class="list">
                <playlist
                        v-for="playlist in playlists"
                        :playlist="playlist"
                        :key="playlist.id"
                        @click="select(playlist)" />
            </ul>
        </section>

        <section class="playlists">
            <h2 class="title">Your playlists</h2>
            <ul class="list" v-if="userPlaylists.length">
                <playlist
                        v-for="playlist in userPlaylists"
                        :playlist="playlist"
                        :key="playlist.id"
                        @click="select(playlist)" />
            </ul>
            <span class="no-playlists" v-else>You don't have any public playlists with more than 4 songs...</span>
        </section>
    </div>
</template>

<script>
    import spotify from '@/spotify';

    import Playlist from '@/components/Playlist';

    export default {
        name: 'choose',
        components: {
            Playlist
        },
        data() {
            return {
                playlists: [],
                userPlaylists: []
            }
        },
        async mounted() {
            const featuredPlaylists = await spotify.getFeaturedPlaylists();
            this.playlists = featuredPlaylists.playlists.items;

            const userPlaylists = await spotify.getUserPlaylists();
            this.userPlaylists = userPlaylists.items.filter(item => {
                return item.tracks.total > 4;
            });
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

    .title {
        text-align: center;
    }

    .list {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;

        list-style: none;
    }

    .no-playlists {
        display: block;

        text-align: center;
    }
</style>