<template>
    <form class="searchFilters">
        <input type="text" v-model="searchText" v-bind:placeholder="$t('searchText')" />
        <select v-model="recipeType">
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

    export default Vue.extend({
        props: {
            filterOptions: Object
        },
        data () {
            return {
                searchText: "",
                recipeType: "",
                mainIngredient: "",
                season: ""
            }
        },
        methods: {
            search () {
                console.log('Search...', this.searchText, this.recipeType, this.mainIngredient, this.season);
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
