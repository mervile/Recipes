import Vue from 'vue';
import Vuex from 'vuex';

import {recipeService} from './services/RecipeService';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recipes: [],
        total: 0,
        loading: false,
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
        }
    },
    actions: {
        updateRecipes ({commit, state}) {
            commit('loading', true);
            recipeService.getRecipes(state.pagingOptions, state.filters).then(result => {
                commit('loading', false);
                commit('updateRecipes', result);
            });
        }
    }
});

export default store;