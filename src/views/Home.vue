<template>
    <div class="home">
        <a :href="`https://accounts.spotify.com/authorize?client_id=89a8abdb45134beeb7062678510eaad9&redirect_uri=${redirectUrl}&response_type=token`">Login
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
