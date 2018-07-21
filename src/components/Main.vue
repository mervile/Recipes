<template>
    <div class="main-content">
        <recipes-header></recipes-header>
        <router-view></router-view>
    </div>
</template>

<script>
    import Vue from 'vue';
    import RecipesHeader from './Header.vue';

    export default Vue.extend({
        components: {
            RecipesHeader
        }
    });
</script>

<style>
html, body {
    font-family: Arial, Helvetica, sans-serif;
}
</style>

