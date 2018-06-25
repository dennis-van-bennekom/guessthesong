<template>
    <div class="home">
        <p class="introduction">
            Please login with Spotify to play Guess the Song!
        </p>
        <a class="login-button" :href="`https://accounts.spotify.com/authorize?client_id=89a8abdb45134beeb7062678510eaad9&redirect_uri=${redirectUrl}&response_type=token`">Login
            with Spotify</a>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                redirectUrl: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/callback'
            }
        }
    }
</script>

<style scoped>
    .home {
        padding: 1rem;

        text-align: center;
    }

    .login-button {
        display: inline-block;
        padding: 0.5rem 0.75rem;

        text-decoration: none;

        background: #3498DB;
        color: #fff;

        transition: all 0.1s ease-in-out;
        cursor: pointer;
    }

    .login-button:hover {
        background: #2980B9;
    }
</style>
