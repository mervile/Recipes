<template>
    <div>
        <button v-bind:disabled="page === 1" v-on:click="prev()">
            <font-awesome-icon icon="chevron-left" /></button>
        {{ page }} / {{ pages }}
        <button v-bind:disabled="page === pages" v-on:click="next()">
            <font-awesome-icon icon="chevron-right" /></button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { PagingOptions } from '../services/RecipeService';

library.add(faChevronRight);
library.add(faChevronLeft);

export default Vue.extend({
    props: {
        total: Number
    },
    data () {
        return {
            page: 1,
            itemsPerPage: 10
        }
    },
    computed: {
        pages: function() {
            return Math.ceil(this.total / this.itemsPerPage);
        }
    },
    methods: {
        next () {
            this.page++;
            this.$emit('paging-update', {page: this.page-1, itemsPerPage: this.itemsPerPage});
        },
        prev () {
            this.page--;
            this.$emit('paging-update', {page: this.page-1, itemsPerPage: this.itemsPerPage});
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
