<template>
    <div class="recipes">
        <!-- v-bind tells Vue filter-options is an expression rather than string -->
        <recipe-filters v-bind:filter-options="filterOptions" v-on:filter-recipes="updateFilters"></recipe-filters>
        <pagination v-bind:total="total" v-on:paging-update="updateRecipes"></pagination>
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
import {recipeService, Recipe, PagedResults, RecipeType, PagingOptions, RecipeFiltersInterface} from '../services/RecipeService';

let recipes: Array<Recipe> = [];

export default Vue.extend({
    components: {
        RecipeFilters,
        Pagination,
        GridList
    },
    data () {
        return {
            recipes,
            filterOptions: recipeService.getFilterOptions(),
            total: 0,
            filters: {}
        }
    },
    created () {
        this.updateRecipes({page: 0, itemsPerPage: 10});
    },
    methods: {
        updateRecipes (pagingOpts: PagingOptions) {
            recipeService.getRecipes(pagingOpts, this.filters).then(result => {
                this.recipes = result.items;
                this.total = result.total;
            });
        },
        updateFilters (filters: RecipeFiltersInterface) {
            this.filters = filters;
            this.updateRecipes({page: 0, itemsPerPage: 10});
        },
        getImage (recipe: Recipe) {
            if (recipe.type === RecipeType.DESSERT) {
                return 'cookie-bite';
            }
            return 'utensils';
        }
    }
});
</script>
