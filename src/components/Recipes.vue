<template>
    <!-- v-bind tells Vue filter-options is an expression rather than string -->
    <recipe-filters v-bind:filter-options="filterOptions"></recipe-filters>
</template>

<script>
    import Vue from 'vue';
    import RecipeFilters from './RecipeFilters.vue';

    export default Vue.extend({
        props: {
            filterOptions: Object
        },
        components: {
            RecipeFilters
        }
    });
</script>

