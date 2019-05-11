<template>
    <form class="edit-recipe-view">
        <header>
            <h1>{{ $t(recipeViewTitle) }}</h1>
        </header>

        <section class="filter-attributes">
            <h3>{{ $t('basicInfo') }}</h3>

            <div class="container">
                <label for="name"><span class="required">*</span>{{ $t('name') }}</label>

                <input name="name" autofocus v-model="recipe.name" required />
            </div>

            <div class="container">
                <label for="type"><span class="required">*</span>{{ $t('recipeTypes.recipeType') }}</label>

                <select v-model="recipe.type" name="type" required>
                    <option v-for="type in filterOptions.recipeTypes" :key="type.id" v-bind:value="type.value">
                        {{ $t(type.name) }}</option>
                </select>
            </div>

            <div class="container">
                <label for="mainIngredient"><span class="required">*</span>{{ $t('mainIngredients.mainIngredient') }}</label>

                <select v-model="recipe.mainIngredient" name="mainIngredient" required>
                    <option v-for="ingredient in filterOptions.mainIngredients" :key="ingredient.id" v-bind:value="ingredient.value">
                        {{ $t(ingredient.name) }}</option>
                </select>
            </div>

            <div class="container">
                <label for="season">{{ $t('seasons.season') }}</label>

                <select v-model="recipe.season" name="season">
                    <option v-for="season in filterOptions.seasons" :key="season.id" :value="season.value">
                        {{ $t(season.name) }}</option>
                </select>
            </div>
        </section>

        <section class="ingredients">
            <h3>{{ $t('ingredients') }}</h3>

            <edit-ingredient 
                v-for="(ingredient, index) in recipe.ingredients"
                v-on:remove-ingredient="removeIngredient"
                v-on:add-ingredient="addIngredient"
                :key="ingredient.id"
                :show-label="index === 0"
                :ingredient="ingredient"></edit-ingredient>

            <button class="image-button" v-on:click.stop.prevent="addIngredient()">
                <font-awesome-icon class="fa-icon" icon="plus" />
            </button>
        </section>

        <section class="instructions">
            <h3>{{ $t('instructions') }}</h3>

            <textarea rows="10" v-model="recipe.instructions" />
        </section>

        <section class="edit-recipe-image">
            <h3>{{ $t('image') }}</h3>
            <!-- TODO Size restriction -->
            <div class="image-input">
                <input type="file"
                    id="recipe-result-image"
                    name="recipe-result-image"
                    @change="handleFile"
                    accept="image/png, image/jpeg" />
                <img v-if="recipe.image" :src="recipe.image" />
                <font-awesome-icon v-if="!recipe.image" class="fa-icon placeholder" :icon="'utensils'" />
            </div>
        </section>

        <footer>
            <button
                class="action-button"
                v-if="isEdit">
                <delete-recipe-confirm-modal :recipe="recipe">{{ $t('delete') }}</delete-recipe-confirm-modal>
            </button>
            <button 
                class="action-button"
                :disabled="!isSaveButtonEnabled() || !isFormValid()"
                type="submit"
                v-on:click.prevent.stop="save()">{{ $t('save') }}</button>
        </footer>
    </form>
</template>

<script lang="ts">
import Vue from 'vue';
import {recipeService} from '../services/RecipeService';
import {Ingredient} from '../../../common/models';
import EditIngredient from './EditIngredient.vue';
import DeleteRecipeConfirmModal from './DeleteRecipeConfirmModal.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import * as _ from 'lodash';

library.add(faPlus);

export default Vue.extend({
    components: {
        EditIngredient,
        DeleteRecipeConfirmModal
    },
    watch: {
        '$route' (to, from) {
            this.update(to.params.id);
        }
    },
    mounted() {
        this.reader.onload = (e) => {
            this.recipe.image = e.target && e.target.result;
        };

        this.update(this.$route.params.id);
    },
    data() {
        return {
            recipeViewTitle: 'createRecipe',
            recipe: recipeService.createRecipePlaceholder(),
            filterOptions: recipeService.getFilterOptions(),
            originalRecipe: {},
            isEdit: false,

            reader: new FileReader()
        }
    },
    methods: {
        update(id) {
            this.isEdit = !_.isNil(id);

            if (this.isEdit) {
                this.getRecipe(id);
            } else {
                this.recipe = recipeService.createRecipePlaceholder();
                this.recipeViewTitle = 'createRecipe';
            }
        },
        getRecipe(id) {
            recipeService.getRecipe(id).then((recipe) => {
                this.recipe = recipe;
                this.originalRecipe = _.cloneDeep(recipe);
                this.recipeViewTitle = this.recipe.name;
            });
        },
        addIngredient() {
            this.recipe.ingredients.push({
                    id: Date.now().toString(),
                    name: '',
                    quantity: undefined,
                    unit: undefined
            });
        },
        removeIngredient(id) {
            const index = _.findIndex(this.recipe.ingredients, (ingr: any) => ingr.id === id);
            this.recipe.ingredients.splice(index, 1);
        },
        handleFile(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            this.reader.readAsDataURL(file);
        },
        isSaveButtonEnabled() {
            return !_.isEqual(this.originalRecipe, this.recipe); 
        },
        isFormValid() {
            return !!this.recipe.name && !_.isNil(this.recipe.type) && this.recipe.ingredients.length > 0 &&
                _.every(this.recipe.ingredients, ingr => !!ingr.name);
        },
        save() {
            if (this.isEdit) {
                recipeService.updateRecipe(this.recipe).then(() => {
                    this.originalRecipe = _.cloneDeep(this.recipe);
                });
            } else {
                recipeService.createRecipe(this.recipe).then((id) => {
                    this.$router.push({ path: `/recipe/${id}` });
                });
            }
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

section {
    padding: 1.5em 0.5em 0.5em 1em;
    box-shadow: 1px 1px 0px 0px grey;
    position: relative;
    border: 1px solid var(--content-color);
    background-color: var(--light-background-color);
    margin: 1em;
}

.image-input {
    display: flex;
    flex-direction: column;
}

.edit-recipe-image img, .fa-icon.placeholder {
    width: 200px;
    height: 200px;
}

form {
    display: flex;
    flex-direction: column;
    height: calc(100% - 85px); /*header height*/
}

form .edit-recipe-image input {
    margin: 0;
}

form h3 {
    padding: 0 1em;
    position: absolute;
    top: -0.8em;
    background-image: linear-gradient(white, var(--light-background-color));
    color: var(--content-color);
    border: 1px solid var(--content-color);
}

form textarea {
    width: 100%;
    height: 100%;
}

.filter-attributes {
    display: flex;
    flex-direction: column;
}

.filter-attributes .container {
    flex: 1 1 0;
}

footer {
    display: flex;
    justify-content: flex-end;
    background-image: linear-gradient(var(--content-background-color), white);
    border-top: 1px solid var(--content-color);
    margin-top: auto;
}

.modal-content {
    padding: 15px;
}

@media screen and (min-width: 1150px) {
    .filter-attributes {
        grid-area: filters;
    }

    .ingredients {
        grid-area: ingredients;
    }

    .instructions {
        grid-area: instructions;
    }

    header {
        grid-area: header;
    }

    footer {
        grid-area: footer;
    }

    .edit-recipe-image {
        grid-area: image;
        max-height: 300px;
    }

    form {
        display: grid;
        grid-template-columns: 1fr minmax(min-content, 750px) minmax(min-content, 400px) 1fr;
        grid-template-rows: repeat(3, min-content) 1fr min-content;
        grid-template-areas: ".            header       .      ."
                             ".            filters      image  ."
                             ".            ingredients  image  ."
                             ".            instructions .      ."
                             "footer       footer       footer footer";
    }
}

@media screen and (min-width: 650px) {
    .filter-attributes {
        flex-direction: row;
        flex-wrap: wrap;
    }
}
</style>
