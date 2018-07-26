import * as en from './languages/en.json';
import * as fi from './languages/fi.json';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import RecipesMain from './components/Main.vue';

import Recipes from './components/Recipes.vue';
import IngredientMap from './components/Map.vue';
import EditRecipe from './components/EditRecipe.vue';

Vue.use(VueRouter);
Vue.use(VueI18n);

Vue.component('font-awesome-icon', FontAwesomeIcon)

const filterOptions: Object = {
    recipeTypes: [
        { id: 0, value: "", name: 'recipeTypes.recipeType' },
        { id: 1, value: "snack", name: "recipeTypes.snack" },
        { id: 2, value: "meal", name: "recipeTypes.meal" },
        { id: 3, value: "dessert", name: "recipeTypes.dessert" },
    ],
    mainIngredients: [
        { id: 0, value: "", name: "mainIngredients.mainIngredient" },
        { id: 1, value: "bird", name: "mainIngredients.bird" },
        { id: 2, value: "fish", name: "mainIngredients.fish" },
        { id: 3, value: "meat", name: "mainIngredients.meat" },
        { id: 4, value: "vegetable", name: "mainIngredients.vegetable" },
    ],
    seasons: [
        { id: 0, value: "", name: "seasons.season" },
        { id: 1, value: "summer", name: "seasons.summer" },
        { id: 2, value: "fall", name: "seasons.fall" },
        { id: 3, value: "winter", name: "seasons.winter" },
        { id: 4, value: "spring", name: "seasons.spring" },
    ]
};

const routes = [
    { id: '0', path: '/', redirect: '/recipes' },
    { id: '1', path: '/recipes', component: Recipes, props: {filterOptions}, name: 'recipes' },
    { id: '2', path: '/edit-recipe', component: EditRecipe, name: 'createRecipe' },
    { id: '3', path: '/map', component: IngredientMap, name: 'map' },
];

const router = new VueRouter({
  routes
});

const i18n = new VueI18n({
    locale: 'fi',
    messages: {
        en,
        fi
    }
});
  
const app = new Vue({
    router,
    i18n,
    el: '#recipes-app',
    components: {
        RecipesMain
    },
    template: '<recipes-main></recipes-main>',
    data: {
        filterOptions
    }
});
