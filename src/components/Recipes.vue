<template>
    <div class="recipes">
        <!-- v-bind tells Vue filter-options is an expression rather than string -->
        <recipe-filters v-bind:filter-options="filterOptions"></recipe-filters>
        <pagination></pagination>
    </div>
</template>

<script>
    import Vue from 'vue';
    import RecipeFilters from './RecipeFilters.vue';
    import Pagination from './Pagination.vue';

    export default Vue.extend({
        props: {
            filterOptions: Object
        },
        components: {
            RecipeFilters,
            Pagination
        }
    });
</script>
