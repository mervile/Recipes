import Vue from 'vue';
import VueRouter from 'vue-router';

import RecipesMain from './components/Main.vue';

Vue.use(VueRouter);

import Recipes from './components/Recipes.vue';
import IngredientMap from './components/Map.vue';
import EditRecipe from './components/EditRecipe.vue';

const routes = [
    { id: '0', path: '/', redirect: '/recipes' },
    { id: '1', path: '/recipes', component: Recipes, name: 'Reseptit' },
    { id: '2', path: '/edit-recipe', component: EditRecipe, name: 'Uusi resepti' },
    { id: '3', path: '/map', component: IngredientMap, name: 'Kartta' },
];

const router = new VueRouter({
  routes
});

const app = new Vue({
    router,
    el: '#recipes-app',
    components: {
        RecipesMain
    },
    template: '<recipes-main></recipes-main>',
    data: {
        test: 'hello'
    }
});
