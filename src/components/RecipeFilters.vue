<template>
    <form class="searchFilters">
        <input type="text" v-model="searchText" v-bind:placeholder="$t('searchText')" />
        <select v-model="type">
            <option v-for="type in filterOptions.recipeTypes" :key="type.id" v-bind:value="type.value">
                {{ $t(type.name) }}</option>
        </select>
        <select v-model="mainIngredient">
            <option v-for="ingredient in filterOptions.mainIngredients" :key="ingredient.id" v-bind:value="ingredient.value">
                {{ $t(ingredient.name) }}</option>
        </select>
        <select v-model="season">
            <option v-for="season in filterOptions.seasons" :key="season.id" v-bind:value="season.value">
                {{ $t(season.name) }}</option>
        </select>
        <button v-on:click="search">{{ $t('search') }}</button>
    </form>
</template>

<script>
    import Vue from 'vue';
    import {recipeService} from '../services/RecipeService';

    export default Vue.extend({
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
                    this.search();
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

<style>
    .searchFilters {
        border-top: 1px dotted;
        border-bottom: 1px dotted;
    }

    .searchFilters button {
        min-width: 80px;
    }

    @media screen and (max-width: 500px) {
        .searchFilters {
            display: flex;
            flex-direction: column;
        }
    }
</style>
