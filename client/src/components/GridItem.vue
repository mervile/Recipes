<template>
    <div class="grid-item" v-on:click.prevent.stop="onClick()">
        <h3>{{ item.name }}</h3>
        <component :is="component" :item="item" class="ext-component"></component>
        <div class="controls"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        item: Object,
        component: String
    },
    methods: {
        onClick() {
            this.$emit('grid-item-clicked', this.item);
        }
    }
});
</script>

<style scoped>
.grid-item {
    min-width: 100px;
    min-height: 100px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    cursor: pointer;
}

.ext-component {
    max-width: 150px;
    max-height: 150px;
}
</style>
