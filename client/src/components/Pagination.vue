<template>
    <div>
        <button class="image-button" v-bind:disabled="page === 1" v-on:click="prev()">
            <font-awesome-icon icon="chevron-left" /></button>
        {{ page }} / {{ pages }}
        <button class="image-button" v-bind:disabled="page === pages" v-on:click="next()">
            <font-awesome-icon icon="chevron-right" /></button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faChevronRight);
library.add(faChevronLeft);

export default Vue.extend({
    computed: {
        pages: function() {
            const pages = Math.ceil(this.$store.state.total / this.$store.state.pagingOptions.itemsPerPage);
            return pages > 0 ? pages : 1;
        },
        page: function() {
            return this.$store.state.pagingOptions.page + 1;
        }
    },
    methods: {
        next () {
            this.$store.commit('nextPage');
            this.$store.dispatch('updateRecipes');
        },
        prev () {
            this.$store.commit('prevPage');
            this.$store.dispatch('updateRecipes');
        }
    }
});
</script>

<style scoped>
div {
    margin: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
}

button {
    min-width: 3em;
}
</style>
