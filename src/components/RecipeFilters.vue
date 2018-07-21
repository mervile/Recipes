<template>
    <form class="searchFilters">
        <input type="text" v-model="searchText" placeholder="Hakusana" />
        <select v-model="recipeType">
            <option v-for="type in recipeTypes" :key="type.id" v-bind:value="type.value">
                {{type.name}}</option>
        </select>
        <select v-model="mainIngredient">
            <option v-for="ingredient in mainIngredients" :key="ingredient.id" v-bind:value="ingredient.value">
                {{ingredient.name}}</option>
        </select>
        <select v-model="season">
            <option v-for="season in seasons" :key="season.id" v-bind:value="season.value">
                {{season.name}}</option>
        </select>
        <button v-on:click="search">Hae</button>
    </form>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        data () {
            return {
                searchText: "",
                recipeType: "",
                recipeTypes: [
                    { id: 0, value: "", name: "Tyyppi" },
                    { id: 1, value: "snack", name: "Välipala" },
                    { id: 2, value: "meal", name: "Lounas/Päivällinen" },
                    { id: 3, value: "dessert", name: "Jälkiruoka" },
                ],
                mainIngredient: "",
                mainIngredients: [
                    { id: 0, value: "", name: "Pääraaka-aine" },
                    { id: 1, value: "bird", name: "Lintu" },
                    { id: 2, value: "fish", name: "Kala" },
                    { id: 3, value: "meat", name: "Liha" },
                    { id: 4, value: "vegetable", name: "Kasvis" },
                ],
                season: "",
                seasons: [
                    { id: 0, value: "", name: "Kausi" },
                    { id: 1, value: "summer", name: "Kesä" },
                    { id: 2, value: "fall", name: "Syksy" },
                    { id: 3, value: "winter", name: "Talvi" },
                    { id: 4, value: "spring", name: "Kevät" },
                ]
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

    .searchFilters select, .searchFilters input, .searchFilters button {
        margin: 1em;
        padding: 1em 0.5em;
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
