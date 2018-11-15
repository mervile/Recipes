import Vue from 'vue';
import VueRouter from 'vue-router';

import Recipes from './components/Recipes.vue';
import IngredientMap from './components/Map.vue';
import EditRecipe from './components/EditRecipe.vue';

Vue.use(VueRouter);

const routes = [
    { id: '0', path: '/', redirect: '/recipes'},
    { id: '1', path: '/recipes', component: Recipes, name: 'recipes', inTopNavigation: true},
    { id: '2', path: '/create', component: EditRecipe, name: 'createRecipe', inTopNavigation: true},
    { id: '3', path: '/recipe/:id', component: EditRecipe, name: 'editRecipe'},
    { id: '4', path: '/map', component: IngredientMap, name: 'map', inTopNavigation: true},
];

const router = new VueRouter({
    routes
});

export default router;
