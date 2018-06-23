<template>
    <div class="play" v-if="!finished">
        <section class="header">
            <h1>{{ selected.name }}</h1>

            <h2>Round {{ index + 1 }}/{{ tracks.length }}</h2>
        </section>

        <h3>Time: {{ this.roundScore }} - Total score: {{ this.totalScore }}</h3>

        <h3 v-if="result">{{ result }}</h3>

        <section class="answers">
            <button class="answer" v-for="answer in answers" @click.prevent="guess(answer)" :disabled="!!result">
                <span class="button-line artist">{{ answer.track.artists[0].name }}</span>
                <span class="button-line name">{{ answer.track.name }}</span>
            </button>
        </section>
    </div>
    <div class="play" v-else>
        <section class="header">
            <h1>Finished</h1>
        </section>

        <section class="finished">
            <p>
                You got {{ correct }} out of {{ tracks.length }} songs correct!
                Points: {{ totalScore }}
            </p>

            <p>
                <router-link to="choose">Back to playlists</router-link>
            </p>
        </section>
    </div>
</template>

<script>
    import spotify from '../spotify';

    let nextTimeout;
    let scoreInterval;

    export default {
        name: 'play',
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
                result: '',
                finished: false,
                correct: 0,
                roundScore: 0,
                totalScore: 0
            }
        },
        async mounted() {
            this.audio.addEventListener('play', this.handleAudioPlayed);

            this.selected = this.$route.params.selected;

            const result = await spotify.getPlaylistTracks(this.selected.owner.id, this.selected.id);

            this.tracks = shuffle(result.items.filter(item => {
                return item.track.preview_url;
            })).slice(0, 15); // Limit to 15 songs so it's not too long

            this.next();
        },
        methods: {
            next() {
                this.result = '';
                this.roundScore = 30;

                this.index++;

                if (this.index > this.tracks.length - 1) {
                    this.finished = true;
                    return;
                }

                this.current = this.tracks[this.index];

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
                clearInterval(scoreInterval);

                if (answer.track.id === this.current.track.id) {
                    this.result = `Correct with ${this.roundScore} points!`;
                    this.correct++;
                    this.totalScore += this.roundScore;
                } else {
                    this.result = 'Wrong!';
                }

                this.audio.pause();

                nextTimeout = setTimeout(() => this.next(), 2000);
            },
            updateScore() {
                this.roundScore--;

                if (this.roundScore === 0) {
                    this.result = 'Too late!';

                    this.audio.pause();

                    clearInterval(scoreInterval);
                    nextTimeout = setTimeout(() => this.next(), 2000);
                }
            },
            handleAudioPlayed() {
                scoreInterval = setInterval(this.updateScore, 1000);
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

<style scoped>
    .play {
        width: 100%;
        max-width: 50rem;
        margin: 0 auto;
        padding: 0 1rem 1rem;
    }

    .header {
        display: flex;
        justify-content: center;
    }

    h1 {
        padding-right: 1rem;
    }

    .answers {
        display: flex;
        flex-direction: column;
    }

    .answer {
        padding: 0.5rem 0.75rem;

        text-align: left;
        font-size: 1rem;

        background: #3498DB;

        border: none;

        transition: all 0.1s ease-in-out;
        cursor: pointer;
    }

    .answer:hover,
    .answer.selected {
        background: #2980B9;
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

    .finished {
        text-align: center;
    }
</style>
