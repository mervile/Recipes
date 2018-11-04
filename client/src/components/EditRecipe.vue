<template>
    <div class="col">
        <header>
            <h1>{{ $t(recipeViewTitle) }}</h1>
        </header>

        <form>
            <div>
                <section class="filter-attributes">
                    <h3>{{ $t('basicInfo') }}</h3>

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
                    <h3>{{ $t('ingredients') }}</h3>

                    <edit-ingredient 
                        v-for="(ingredient, index) in recipe.ingredients"
                        :key="ingredient.id"
                        :show-label="index === 0"
                        :ingredient="ingredient"></edit-ingredient>

                    <button class="image-button" v-on:click.stop.prevent="addIngredient()">
                        <font-awesome-icon class="fa-icon" icon="plus" />
                    </button>
                </section>

                <section>
                    <h3>{{ $t('instructions') }}</h3>

                    <textarea rows="10" v-model="recipe.instructions" />
                </section>
            </div>

            <div class="col">
                <section class="image">
                    <h3>{{ $t('image') }}</h3>
                    <input type="file"
                        id="recipe-result-image"
                        name="recipe-result-image"
                        @change="handleFile"
                        accept="image/png, image/jpeg" />
                    <img v-if="image" :src="image" />
                    <font-awesome-icon v-if="!image" class="fa-icon placeholder" :icon="'utensils'" />
                </section>
            </div>
        </form>

        <footer>
            <button type="submit">{{ $t('save') }}</button>
        </footer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {recipeService} from '../services/RecipeService';
import EditIngredient from './EditIngredient.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus);

export default Vue.extend({
    components: {
        EditIngredient
    },
    data() {
        return {
            recipeViewTitle: 'createRecipe', // isEdit ? ..
            recipe: this.$store.state.recipe,
            filterOptions: recipeService.getFilterOptions(),
            image: ''
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
        },
        handleFile(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            const image = new Image();
            const reader = new FileReader();
            const vm = this;

            reader.onload = (e) => {
                vm.image = e.target && e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
});
</script>

<style scoped>
header {
    padding: 1em;
}

header h1 {
    color: var(--content-color);
    text-transform: uppercase;
}

.col {
    flex: 1;
}

section {
    padding: 1.5em 0.5em 0.5em 1em;
    box-shadow: 1px 1px 0px 0px grey;
    margin: 2.5em 1em;
    position: relative;
    border: 1px solid var(--content-color);
    background-color: white;
}

.image {
    display: flex;
    flex-direction: column;
}

.image img, .fa-icon.placeholder {
    width: 200px;
    height: 200px;
}

form .image input {
    margin: 0;
}

form {
    display: flex;
    flex-wrap: wrap;
}

form h3 {
    padding: 0 1em;
    position: absolute;
    top: -0.8em;
    background-image: linear-gradient(white, var(--main-background-color));
    color: var(--content-color);
    border: 1px solid var(--content-color);
}

form textarea {
    width: 100%;
}

.fa-icon {
    width: 3em;
    height: 3em;
}

.filter-attributes {
    display: flex;
    flex-wrap: wrap;
}

@media screen and (max-width: 744px) {
    .filter-attributes, form {
        flex-direction: column;
    }
}

@media screen and (max-width: 500px) {
    .filter-attributes, form {
        flex-wrap: nowrap;
    }
}

h2 {
    padding-bottom: 1em;
}

footer {
    display: flex;
    justify-content: flex-end;
    background-image: linear-gradient(var(--content-background-color), white);
    border-top: 1px solid var(--content-color);
}
</style>
