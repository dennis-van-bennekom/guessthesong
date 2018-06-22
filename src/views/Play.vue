<template>
    <div class="play">
        <h1>{{ selected.name }}</h1>

        <h2>Round {{ index + 1 }}/{{ tracks.length }}</h2>

        <h3 v-if="result">{{ result }}</h3>

        <section class="answers">
            <button class="answer" v-for="answer in answers" @click.prevent="guess(answer)" :disabled="!!result">
                {{ answer.track.name }}
            </button>
        </section>
    </div>
</template>

<script>
    import spotify from '../spotify';

    let nextTimeout;

    export default {
        name: 'play',
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (!spotify.getAccessToken()) {
                    vm.$router.push({ name: 'home' });
                }
            });
        },
        beforeRouteLeave(to, from, next) {
            this.audio.pause();
            clearTimeout(nextTimeout);
            next();
        },
        data() {
            return {
                selected: {},
                tracks: [],
                index: -1,
                current: {},
                choices: [],
                answers: [],
                audio: new Audio(),
                result: ''
            }
        },
        async mounted() {
            this.selected = this.$route.params.selected;

            const result = await spotify.getPlaylistTracks(this.selected.owner.id, this.selected.id);

            this.tracks = shuffle(result.items.filter(item => {
                return item.track.preview_url;
            }));

            this.next();
        },
        methods: {
            next() {
                this.result = '';
                this.audio.pause();

                this.current = this.tracks[++this.index];

                const answers = [this.current];

                while (answers.length < 4) {
                    const random = Math.floor(Math.random() * this.tracks.length);
                    const answer = this.tracks[random];

                    if (answers.indexOf(answer) < 0) {
                        answers.push(answer);
                    }
                }

                this.answers = shuffle(answers);

                this.audio.src = this.current.track.preview_url;
                this.audio.play();
            },
            guess(answer) {
                if (answer.track.id === this.current.track.id) {
                    this.result = 'Correct!';
                } else {
                    this.result = 'Wrong!';
                }

                nextTimeout = setTimeout(() => this.next(), 1000);
            }
        }
    }

    function shuffle(array) {
        let counter = array.length;

        while (counter > 0) {
            const index = Math.floor(Math.random() * counter);

            counter--;

            const temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }
</script>
