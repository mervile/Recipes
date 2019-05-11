<template>
    <div class="ingredient">
        <div class="container quantity">
            <label v-if="showLabel" for="ingredient-quantity">{{ $t('quantity') }}</label>
            <input name="ingredient-quantity" placeholder="0" step="0.01" type="number" min="0" v-model="ingredient.quantity" />
        </div>

        <div class="container unit">
            <label v-if="showLabel" for="ingredient-unit">{{ $t('unit') }}</label>
            <select name="ingredient-unit" v-model="ingredient.unit">
                <option v-for="unit in units" :key="unit.id" :value="unit.value">
                    {{ $t(unit.name) }}</option>
            </select>
        </div>

        <div class="container" v-on:keydown.down.stop.prevent="$emit('add-ingredient', ingredient.id)">
            <label v-if="showLabel" for="ingredient-name"><span class="required">*</span>{{ $t('name') }}</label>
            <input name="ingredient-name" v-model="ingredient.name" required />
        </div>

        <button class="image-button" v-on:click.stop.prevent="$emit('remove-ingredient', ingredient.id)">
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
    mounted() {
        const inputs = this.$el.getElementsByTagName('input');
        if (inputs[0]) {
            inputs[0].focus();
        }
    },
    data() {
        return {
            units: recipeService.getUnitOptions(),
        }
    }
});
</script>

<style scoped>
.ingredient {
    display: flex;
}

.quantity {
    width: 80px;
}
</style>
