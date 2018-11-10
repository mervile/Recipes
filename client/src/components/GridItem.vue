<template>
    <div class="grid-item">
        <h3>{{ item.name }}</h3>
        <font-awesome-icon v-if="!item.image" class="fa-icon" v-bind:icon="placeholderImage" />
        <img v-if="item.image" :src="item.image" />
        <div class="controls"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCookieBite, faUtensils } from '@fortawesome/free-solid-svg-icons'

library.add(faCookieBite);
library.add(faUtensils);

export default Vue.extend({
    props: {
        placeholderImage: String,
        item: Object
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
}

img {
    max-width: 150px;
    max-height: 150px;
}
</style>
