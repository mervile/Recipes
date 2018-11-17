<template>
    <div class="recipes">
        <recipe-filters></recipe-filters>

        <pagination></pagination>

        <div class="info-text">
            <span class="no-results" v-if="!loading && !error && recipes.length === 0">
                {{ $t('noResults') }}</span>

            <span class="loading" v-if="loading">{{ $t('loading') }}</span>

            <span class="error" v-if="!loading && error">{{ $t('error') }}</span>
        </div>

        <grid-list
            :items="recipes"
            :component="recipeImageComponent"
            v-on:grid-item-clicked="onRecipeClick"></grid-list>

        <recipe-comp :recipe="recipe" v-if="showRecipe" v-on:close-modal="closeModal()"></recipe-comp>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RecipeFilters from './RecipeFilters.vue';
import Pagination from './Pagination.vue';
import GridList from './GridList.vue';
import RecipeImage from './RecipeImage.vue';
import RecipeComp from './Recipe.vue';
import {Recipe, RecipeType} from '../../../common/models';
import { recipeService } from '../services/RecipeService';

export default Vue.extend({
    components: {
        RecipeFilters,
        Pagination,
        GridList,
        RecipeImage,
        RecipeComp
    },
    mounted() {
        this.$store.dispatch('updateRecipes');
    },
    data() {
        return {
            recipeImageComponent: RecipeImage,
            showRecipe: false,
            recipe: recipeService.createRecipePlaceholder()
        }
    },
    computed: {
        recipes: function() {
            return this.$store.state.recipes;
        },
        loading() {
            return this.$store.state.loading;
        },
        error() {
            return this.$store.state.error;
        }
    },
    methods: {
        onRecipeClick(item: Recipe) {
            this.recipe = item;
            this.showRecipe = true;
        },
        closeModal() {
            this.showRecipe = false;
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
