import Vue from 'vue';
import Vuex from 'vuex';
import * as _ from 'lodash';

import {recipeService} from './services/RecipeService';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recipes: [],
        total: 0,
        loading: false,
        error: false,
        pagingOptions: {
            page: 0,
            itemsPerPage: 10,
            sortBy: '',
            asc: undefined
        },
        filters: {
            searchText: '',
            season: '',
            mainIngredient: '',
            type: ''
        },
        recipe: {
            name: '',
            type: '',
            season: '',
            mainIngredient: '',
            ingredients: [{
                id: Date.now().toString(),
                name: '',
                quantity: '',
                unit: ''
            }],
            instructions: '',
            image: ''
        },
    },
    mutations: {
        updateRecipes (state, payload) {
            state.recipes = payload.items;
            state.total = payload.total;
        },
        setPage (state, page) {
            state.pagingOptions.page = page;
        },
        nextPage (state) {
            state.pagingOptions.page++;
        },
        prevPage (state) {
            state.pagingOptions.page--;
        },
        setFilters (state, filters) {
            state.filters = filters;
        },
        searchText (state, value) {
            state.filters.searchText = value;
        },
        type (state, value) {
            state.filters.type = value;
        },
        mainIngredient (state, value) {
            state.filters.mainIngredient = value;
        },
        season (state, value) {
            state.filters.season = value;
        },
        loading (state, value) {
            state.loading = value;
        },
        error (state, value) {
            state.error = value;
        },
        addIngredient(state, value) {
            state.recipe.ingredients.push(value);
        },
        removeIngredient(state, value) {
            const index = _.findIndex(state.recipe.ingredients, ingr => ingr.id === value);
            state.recipe.ingredients.splice(index, 1);
        }
    },
    actions: {
        updateRecipes ({commit, state}) {
            commit('loading', true);
            recipeService.getRecipes(state.pagingOptions, state.filters).then(result => {
                commit('loading', false);
                commit('updateRecipes', result);
                commit('error', false);
            }).catch(error => {
                commit('loading', false);
                commit('error', true);
                console.error('Error:', error);
            });
        }
    }
});

export default store;