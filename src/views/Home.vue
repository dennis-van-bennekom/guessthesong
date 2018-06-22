<template>
    <div class="home">
        <a :href="`https://accounts.spotify.com/authorize?client_id=89a8abdb45134beeb7062678510eaad9&redirect_uri=${redirectUrl}&response_type=token`">Login
            with Spotify</a>
    </div>
</template>

<script>
    import spotify from '../spotify';

    export default {
        name: 'home',
        data() {
            return {
                redirectUrl: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/callback'
            }
        },
        mounted() {
            const accessToken = localStorage.getItem('accessToken');
            const timestamp = new Date(+localStorage.getItem('timestamp'));
            const hour = 60 * 60 * 1000;

            if (accessToken && (Date.now() - timestamp < hour)) {
                spotify.setAccessToken(accessToken);
                this.$router.push({ name: 'choose' });
            }
        }
    }
</script>

<style scoped>
    .home {
        display: flex;
        justify-content: center;
        padding: 1rem;
    }

    a {
        display: block;
        padding: 0.5rem 0.75rem;

        text-decoration: none;

        background: #3498DB;
        color: #fff;

        transition: all 0.1s ease-in-out;
        cursor: pointer;
    }

    a:hover {
        background: #2980B9;
    }
</style>
