<template>
    <div>
        <header>
            <h1>{{ $t(recipeViewTitle) }}</h1>
        </header>

        <form>
            <section class="filter-attributes">
                <div class="container">
                    <label for="name">{{ $t('name') }}</label>

                    <input name="name" v-model="recipe.name" required />
                </div>

                <div class="container">
                    <label for="type">{{ $t('recipeTypes.recipeType') }}</label>

                    <select v-model="recipe.type" name="type">
                        <option v-for="type in filterOptions.recipeTypes" :key="type.id" v-bind:value="type.value">
                            {{ $t(type.name) }}</option>
                    </select>
                </div>

                <div class="container">
                    <label for="mainIngredient">{{ $t('mainIngredients.mainIngredient') }}</label>

                    <select v-model="recipe.mainIngredient" name="mainIngredient">
                        <option v-for="ingredient in filterOptions.mainIngredients" :key="ingredient.id" v-bind:value="ingredient.value">
                            {{ $t(ingredient.name) }}</option>
                    </select>
                </div>

                <div class="container">
                    <label for="season">{{ $t('seasons.season') }}</label>

                    <select v-model="recipe.season" name="season">
                        <option v-for="season in filterOptions.seasons" :key="season.id" v-bind:value="season.value">
                            {{ $t(season.name) }}</option>
                    </select>
                </div>
            </section>

            <section>
                <h2>{{ $t('ingredients') }}</h2>

                <edit-ingredient 
                    v-for="ingredient in recipe.ingredients"
                    :key="ingredient.id"
                    :ingredient="ingredient"></edit-ingredient>

                <button v-on:click.stop.prevent="addIngredient()">
                    <font-awesome-icon class="fa-icon" icon="plus-square" />
                </button>
            </section>

            <section>
                <h2>{{ $t('instructions') }}</h2>

                <textarea cols="100" rows="10" />
            </section>
        </form>

        <footer></footer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {recipeService} from '../services/RecipeService';
import EditIngredient from './EditIngredient.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

library.add(faPlusSquare);

export default Vue.extend({
    components: {
        EditIngredient
    },
    data() {
        return {
            recipeViewTitle: 'createRecipe', // isEdit ? ..
            recipe: this.$store.state.recipe,
            filterOptions: recipeService.getFilterOptions(),
        }
    },
    methods: {
        addIngredient() {
            this.$store.commit('addIngredient', {
                    id: Date.now().toString(),
                    name: '',
                    quantity: '',
                    unit: ''
            });
        }
    }
});
</script>

<style scoped>
header {
    padding: 1em;
    box-shadow: 0px 0px 2px grey;
}
section {
    padding: 1em 0;
}

form {
    padding: 1em;
}

.fa-icon {
    width: 3em;
    height: 3em;
}

.filter-attributes {
    display: flex;
}

h2 {
    padding-bottom: 1em;
}
</style>
