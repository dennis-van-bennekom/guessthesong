<template>
    <div id="app">
        <h1 class="title">Guess The Song</h1>
        <router-view/>
    </div>
</template>

<style>
    html {
        box-sizing: border-box;
    }

    *, *::before, *::after {
        box-sizing: inherit;
    }

    body {
        margin: 0;

        background: #ECF0F1;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .title {
        margin: 0;
        padding: 0.5rem;

        text-align: center;
        font-size: 1.2rem;

        background: #2C3E50;
        color: #fff;
    }
</style>
