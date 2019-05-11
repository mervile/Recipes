<template>
<recipe-modal v-on:close="closeModal()">
    <template slot="header">
        <h1>{{recipe.name}}</h1>

        <button v-on:click.stop.prevent="closeModal()" class="image-button">
            <font-awesome-icon class="fa-icon" v-bind:icon="'times'" />
        </button>
    </template>

    <article class="modal-content">
        <section class="image">
            <recipe-image class="recipe-image" :item="recipe"></recipe-image>
            <dropdown id="recipe-menu" append-to-body="true">
                <template slot="toggle">
                    <font-awesome-icon class="fa-icon" v-bind:icon="'bars'" />
                </template>
                <recipe-menu :recipe="recipe"></recipe-menu>
            </dropdown>
        </section>

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
import RecipeMenu from './RecipeMenu.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes);
library.add(faBars);

export default Vue.extend({
    components: {
        RecipeImage,
        RecipeModal,
        RecipeMenu,
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

.modal .ingredients, .modal .instructions {
    padding: 1em;
}

.modal .ingredients ul {
    margin: 0 1em;
}

.modal .recipe-image {
    width: 100%;
    text-align: center;
}

.modal .recipe-image img {
    max-width: 250px;
    max-height: 250px;
}

.modal .image {
    display: flex;
    justify-content: space-around;
    padding: 1em;
}

#recipe-menu-toggle {
    background: transparent;
    border: none;
}
</style>
