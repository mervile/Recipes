<template>
    <div class="image">
        <font-awesome-icon v-if="!item.image" class="fa-icon" v-bind:icon="placeholderImage" />
        <img v-if="item.image" :src="item.image" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Recipe, RecipeType} from '../../../common/models';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCookieBite, faUtensils } from '@fortawesome/free-solid-svg-icons'

library.add(faCookieBite);
library.add(faUtensils);

export default Vue.extend({
    props: {
        item: Object
    },
    computed: {
        placeholderImage: function() {
            return this.item.type === RecipeType.DESSERT ? 'cookie-bite' : 'utensils'
        }
    }
});
</script>

<style scoped>
</style>
