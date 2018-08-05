<template>
    <div class="recipes">
        <!-- v-bind tells Vue filter-options is an expression rather than string -->
        <recipe-filters></recipe-filters>
        <pagination></pagination>
        <grid-list
            v-bind:items="recipes"
            v-bind:getImage="getImage"></grid-list>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RecipeFilters from './RecipeFilters.vue';
import Pagination from './Pagination.vue';
import GridList from './GridList.vue';
import {Recipe, RecipeType} from '../services/RecipeService';

export default Vue.extend({
    components: {
        RecipeFilters,
        Pagination,
        GridList
    },
    computed: {
        recipes: function() {
            return this.$store.state.recipes;
        }
    },
    created () {
        this.$store.dispatch('updateRecipes');
    },
    methods: {
        getImage (recipe: Recipe) {
            if (recipe.type === RecipeType.DESSERT) {
                return 'cookie-bite';
            }
            return 'utensils';
        }
    }
});
</script>
