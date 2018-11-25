<template>
<recipe-modal v-on:close="closeModal()">
    <template slot="header">
        <dropdown id="test" append-to-body="true"><div>test</div></dropdown>
        <h1>{{recipe.name}}</h1>

        <button v-on:click.stop.prevent="closeModal()" class="image-button">
            <font-awesome-icon class="fa-icon" v-bind:icon="'times'" />
        </button>
    </template>

    <article class="modal-content">
        <recipe-image class="recipe-image" :item="recipe"></recipe-image>

        <section class="ingredients">
            <ul>
                <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
                    {{ingredient.quantity}}
                    <span v-if="ingredient.unit">{{ $t('units.' + ingredient.unit) }}</span>
                    {{ingredient.name}}
                </li>
            </ul>
        </section>

        <section class="instructions">
            {{recipe.instructions}}
        </section>
    </article>

    <template slot="footer"><div></div></template>
</recipe-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import {Recipe} from '../../../common/models';
import RecipeImage from './RecipeImage.vue';
import RecipeModal from './Modal.vue';
import Dropdown from './Dropdown.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes);

export default Vue.extend({
    components: {
        RecipeImage,
        RecipeModal,
        Dropdown
    },
    props: {
        recipe: Object
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        }
    }
});
</script>

<style>
.modal {
    width: 70%;
}

.modal-header {
    align-items: center;
}

.modal-content {
    max-height: 500px;
    overflow-y: auto;
}

.ingredients, .instructions {
    padding: 1em;
}

.ingredients ul {
    margin: 0 1em;
}

.recipe-image {
    padding: 1em;
    width: 100%;
    text-align: center;
}

.recipe-image img {
    max-width: 250px;
    max-height: 250px;
}
</style>
