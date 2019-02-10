<template>
<ul>
    <router-link tag="li" :to="'recipe/' + recipe.id">
        <a>{{ $t('recipeMenu.modify') }}</a>
    </router-link>
    <li>
        <delete-recipe-confirm-modal :recipe="recipe">{{ $t('recipeMenu.delete') }}</delete-recipe-confirm-modal>
    </li>
</ul>
</template>

<script lang="ts">
import Vue from 'vue';
import DeleteRecipeConfirmModal from './DeleteRecipeConfirmModal.vue';

export default Vue.extend({
    components: {
        DeleteRecipeConfirmModal
    },
    props: {
        recipe: Object
    }
});
</script>

<style scoped>
li {
    list-style: none;
    background-color: black;
    padding: 1em;
    border-bottom: 1px solid gainsboro;
    cursor: pointer;
}

li, li a {
    color: white;
    text-transform: uppercase;
    text-decoration: none;
}

li:hover {
    background-color: darkslategrey;
}
</style>
