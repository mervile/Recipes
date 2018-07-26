<template>
    <div>
        <grid-item
            v-for="item in items" :key="item.id"
            v-bind:placeholder-image="getImage(item)"
            v-bind:title="item.name"></grid-item>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GridItem from './GridItem.vue';
import {PagingOptions, GridItemInterface} from '../services/RecipeService';

export default Vue.extend({
    components: {
        GridItem
    },
    props: {
        items: Array,
        getImage: Function
    }
});
</script>

<style scoped>
div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 10px;
    grid-auto-rows: minmax(200px, auto);
    padding: 1em;
}
</style>
