import Vue from 'vue';
import VueRouter from 'vue-router';

import Recipes from './components/Recipes.vue';
import IngredientMap from './components/Map.vue';
import EditRecipe from './components/EditRecipe.vue';

Vue.use(VueRouter);

const routes = [
    { id: '0', path: '/', redirect: '/recipes' },
    { id: '1', path: '/recipes', component: Recipes, name: 'recipes' },
    { id: '2', path: '/edit-recipe', component: EditRecipe, name: 'createRecipe' },
    { id: '3', path: '/map', component: IngredientMap, name: 'map' },
];

const router = new VueRouter({
    routes
});

export default router;
