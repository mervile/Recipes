<template>
    <form class="searchFilters">
        <div class="container">
            <label for="search">{{ $t('searchText') }}</label>
            <input type="text" name="search" v-model="searchText" />
        </div>

        <div class="container">
            <label for="recipeType">{{ $t('recipeTypes.recipeType') }}</label>
            <select v-model="type" name="recipeType">
                <option value="">-</option>
                <option v-for="type in filterOptions.recipeTypes" :key="type.id" v-bind:value="type.value">
                    {{ $t(type.name) }}</option>
            </select>
        </div>

        <div class="container">
            <label for="mainIngredient">{{ $t('mainIngredients.mainIngredient') }}</label>
            <select v-model="mainIngredient" name="mainIngredient">
                <option value="">-</option>
                <option v-for="ingredient in filterOptions.mainIngredients" :key="ingredient.id" v-bind:value="ingredient.value">
                    {{ $t(ingredient.name) }}</option>
            </select>
        </div>

        <div class="container">
            <label for="season">{{ $t('seasons.season') }}</label>
            <select v-model="season" name="season">
                <option value="">-</option>
                <option v-for="season in filterOptions.seasons" :key="season.id" v-bind:value="season.value">
                    {{ $t(season.name) }}</option>
            </select>
        </div>

        <button class="action-button" v-on:click="search">{{ $t('search') }}</button>
    </form>
</template>

<script>
    import Vue from 'vue';
    import * as _ from 'lodash';
    import {recipeService} from '../services/RecipeService';

    export default Vue.extend({
        created () {
            this.debouncedSearch = _.debounce(this.search, 500, {leading: false});
        },
        beforeDestroy () {
            this.debouncedSearch.cancel();
        },
        computed: {
            filterOptions: function() {
                return recipeService.getFilterOptions()
            },
            searchText: {
                get () {
                    return this.$store.state.filters.searchText;
                },
                set (value) {
                    this.$store.commit('searchText', value);
                    this.debouncedSearch();
                }
            },
            type: {
                get () {
                    return this.$store.state.filters.type;
                },
                set (value) {
                    this.$store.commit('type', value);
                    this.search();
                }
            },
            mainIngredient: {
                get () {
                    return this.$store.state.filters.mainIngredient;
                },
                set (value) {
                    this.$store.commit('mainIngredient', value);
                    this.search();
                }
            },
            season: {
                get () {
                    return this.$store.state.filters.season;
                },
                set (value) {
                    this.$store.commit('season', value);
                    this.search();
                }
            },
        },
        methods: {
            search () {
                this.$store.commit('setPage', 0);
                this.$store.dispatch('updateRecipes');
            }
        }
    });
</script>

<style scoped>
    .searchFilters {
        border-bottom: 1px solid var(--content-color);
        display: flex;
        flex-direction: column;
        padding: 1em;
        background-color: var(--light-background-color);
    }

    .searchFilters .container {
        min-width: 150px;
    }

    .searchFilters button {
        min-width: 80px;
        margin: 3px 1em 1em 0;
    }

    @media screen and (min-width: 500px) {
        .searchFilters {
            flex-direction: row;
            flex-wrap: wrap;
        }
    }
</style>
