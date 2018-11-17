<template>
    <div>
        <grid-item
            v-for="item in items"
            v-on:grid-item-clicked="onItemClick"
            :key="item.id"
            :item="item"
            :component="component">
        </grid-item>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GridItem from './GridItem.vue';
import {PagingOptions, GridItemInterface} from '../../../common/models';

export default Vue.extend({
    components: {
        GridItem
    },
    props: {
        items: Array,
        component: String
    },
    methods: {
        onItemClick(item) {
            this.$emit('grid-item-clicked', item);
        }
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
