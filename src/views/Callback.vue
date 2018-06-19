<template>
  <div class="callback">
    Redirecting...
  </div>
</template>

<script>
    export default {
        name: 'callback',
        mounted() {
            const params = getHashParams();

            this.$store.dispatch('setAccessToken', params.access_token);

            this.$router.push({ name: 'play' });
        }
    }

    function getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
</script>
