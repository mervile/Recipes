<template>
    <div class="main-content">
        <navigation></navigation>
        <router-view></router-view>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Navigation from './Navigation.vue';

    export default Vue.extend({
        components: {
            Navigation
        }
    });
</script>

<style>
html, body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0px;
    padding: 0px;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

select, input, button {
    margin: 1em;
    padding: 1em 0.5em;
}
</style>

