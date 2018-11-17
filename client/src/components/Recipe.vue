<template>
<recipe-modal v-on:close="closeModal()">
    <template slot="header">
        <h1>{{recipe.name}}</h1>
        <button v-on:click.stop.prevent="closeModal()">{{ $t('close') }}</button>
    </template>

    <recipe-image :item="recipe"></recipe-image>

    <section class="ingredients">
        <div v-for="ingredient in recipe.ingredients" :key="ingredient.id">
            {{ingredient.quantity}} {{ $t('units.' + ingredient.unit) }} {{ingredient.name}}
        </div>
    </section>

    <section class="instructions">
        {{recipe.instructions}}
    </section>

    <template slot="footer"><div></div></template>
</recipe-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import {Recipe} from '../../../common/models';
import RecipeImage from './RecipeImage.vue';
import RecipeModal from './Modal.vue';

export default Vue.extend({
    components: {
        RecipeImage,
        RecipeModal
    },
    props: {
        recipe: Object
    },
    computed: {
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        }
    }
});
</script>

<style scoped>
</style>
