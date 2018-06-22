<template>
    <div class="callback">
        Redirecting...
    </div>
</template>

<script>
    import spotify from '../spotify';

    export default {
        name: 'callback',
        mounted() {
            const params = getHashParams();

            spotify.setAccessToken(params.access_token);

            this.$router.push({ name: 'choose' });
        }
    }

    function getHashParams() {
        const hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
</script>
