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
        color: #1f2123;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #app > .title {
        margin: 0;
        padding: 1rem 0.5rem;

        text-align: center;
        font-family: 'Comfortaa', cursive;
        font-size: 1.5rem;

        background: #2C3E50;
        color: #fff;
    }
</style>
