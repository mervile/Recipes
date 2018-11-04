<template>
    <div class="ingredient">
        <div class="container">
            <label v-if="showLabel" for="ingredient-name">{{ $t('name') }}</label>
            <input name="ingredient-name" v-model="ingredient.name" required />
        </div>

        <div class="container">
            <label v-if="showLabel" for="ingredient-quantity">{{ $t('quantity') }}</label>
            <input name="ingredient-quantity" type="number" v-model="ingredient.quantity" />
        </div>

        <div class="container">
            <label v-if="showLabel" for="ingredient-unit">{{ $t('unit') }}</label>
            <select name="ingredient-unit" v-model="ingredient.unit">
                <option v-for="unit in units" :key="unit.id" :value="ingredient.unit">
                    {{ $t(unit.name) }}</option>
            </select>
        </div>

        <button class="image-button" v-on:click.stop.prevent="removeIngredient()">
            <font-awesome-icon class="fa-icon" icon="minus" />
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {recipeService} from '../services/RecipeService';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

library.add(faMinus);

export default Vue.extend({
    props: {
        ingredient: Object,
        showLabel: Boolean
    },
    data() {
        return {
            units: recipeService.getUnitOptions(),
        }
    },
    methods: {
        removeIngredient() {
            this.$store.commit('removeIngredient', this.ingredient.id);
        }
    }
});
</script>

<style scoped>
.ingredient {
    display: flex;
    flex-wrap: wrap;
}

@media screen and (max-width: 500px) {
    .ingredient {
        flex-direction: column;
        flex-wrap: nowrap;
    }
}

button {
    padding: 0.5em;
}

.fa-icon {
    width: 2em;
    height: 2em;
}
</style>
