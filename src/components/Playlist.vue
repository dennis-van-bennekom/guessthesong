<template>
    <li class="playlist">
        <img class="cover" :src="playlist.images[0].url" :alt="playlist.name + ' Image'" @click="select(playlist)">
    </li>
</template>

<script>
    export default {
        name: 'playlist',
        props: {
            playlist: Object
        },
        methods: {
            select(playlist) {
                this.$router.push({ name: 'play', params: { selected: playlist } });
            }
        }
    }
</script>

<style scoped>
    .playlist {
        width: 25%;

        overflow: hidden;
        cursor: pointer;
    }

    .playlist:hover img {
        transform: scale(1.2);
    }

    @media screen and (max-width: 35rem) {
        .playlist {
            width: 33.3333%;
        }
    }

    .cover {
        display: block;
        width: 100%;

        transition: all 0.1s ease-in-out;
    }
</style>