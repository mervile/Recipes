<template>
    <div class="recipes">
        <!-- v-bind tells Vue filter-options is an expression rather than string -->
        <recipe-filters v-bind:filter-options="filterOptions"></recipe-filters>
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
import {recipeService, Recipe, PagedResults, RecipeType, PagingOptions} from '../services/RecipeService';

let recipes: Array<Recipe> = [];

export default Vue.extend({
    props: {
        filterOptions: Object
    },
    components: {
        RecipeFilters,
        Pagination,
        GridList
    },
    data () {
        return {
            recipes,
            total: 0
        }
    },
    created () {
        this.updateRecipes({page: 0, itemsPerPage: 10});
    },
    methods: {
        updateRecipes (pagingOpts: PagingOptions) {
            recipeService.getRecipes(pagingOpts).then(result => {
                this.recipes = result.items;
                this.total = result.total;
            });
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
