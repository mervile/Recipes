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

<style scoped>
.main-content {
    width: 100%;
    height: calc(100% - 82px);
}
</style>

