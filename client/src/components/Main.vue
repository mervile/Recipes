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

