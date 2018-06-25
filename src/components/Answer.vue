<template>
    <button class="answer">
        <span class="button-line artist">{{ answer.track.artists[0].name }}</span>
        <span class="button-line name">{{ answer.track.name }}</span>
    </button>
</template>

<script>
    export default {
        name: 'answer',
        props: {
            answer: Object
        },
        methods: {
            select(playlist) {
                this.$router.push({name: 'play', params: {selected: playlist}});
            }
        }
    }
</script>

<style scoped>
    .answer {
        padding: 0.5rem 0.75rem;

        text-align: left;
        font-size: 1rem;

        background: #3498DB;

        border: none;

        transition: all 0.1s ease-in-out;
        cursor: pointer;
    }

    .answer:not(:last-child) {
        margin-bottom: 1rem;
    }

    .button-line {
        display: block;
    }

    .artist {
        margin-bottom: 0.5rem;
    }

    .name {
        font-size: 1.1rem;
    }
</style>