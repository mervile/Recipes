<template>
    <div>
        <button v-bind:disabled="page === 1" v-on:click="prev()">
            <font-awesome-icon icon="chevron-left" /></button>
        {{ page }} / {{ pages }}
        <button v-bind:disabled="page === pages" v-on:click="next()">
            <font-awesome-icon icon="chevron-right" /></button>
    </div>
</template>

<script>// TODO lang="ts"?
import Vue from 'vue'

export default Vue.extend({
    data () {
        return {
            page: 1,
            pages: 12
        }
    },
    methods: {
        next () {
            this.page++;
        },
        prev () {
            this.page--;
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
