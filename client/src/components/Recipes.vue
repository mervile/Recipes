<template>
    <div class="recipes">
        <!-- v-bind tells Vue filter-options is an expression rather than string -->
        <recipe-filters></recipe-filters>
        <pagination></pagination>
        <div class="info-text">
            <span class="no-results" v-if="!loading && !error && recipes.length === 0">{{ $t('noResults') }}</span>
            <span class="loading" v-if="loading">{{ $t('loading') }}</span>
            <span class="error" v-if="!loading && error">{{ $t('error') }}</span>
        </div>
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
import {Recipe, RecipeType} from '../../../common/models';

export default Vue.extend({
    components: {
        RecipeFilters,
        Pagination,
        GridList
    },
    computed: {
        recipes: function() {
            return this.$store.state.recipes;
        },
        loading () {
            return this.$store.state.loading;
        },
        error () {
            return this.$store.state.error;
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

<style scoped>
.info-text {
    text-align: center;
}
.error {
    color: red;
}
</style>
