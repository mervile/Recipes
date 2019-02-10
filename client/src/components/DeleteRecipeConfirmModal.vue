<template>
<div>
    <div v-on:click.prevent.stop="confirmDelete()">
        <slot>Delete confirm</slot>
    </div>

    <confirm-modal v-if="isModalVisible" v-on:close="closeModal()">
        <template slot="header">{{ $t('confirmAction') }}</template>

        <div class="modal-content">
            <i18n path="confirmRecipeDelete" tag="p">
                <span place="name">{{recipe.name}}</span>
            </i18n>
        </div>

        <template slot="footer">
            <button 
                v-on:click.prevent.stop="closeModal()">{{ $t('cancel') }}</button>
            <button 
                class="action-button"
                v-on:click.prevent.stop="deleteRecipe()">{{ $t('confirm') }}</button>
        </template>
    </confirm-modal>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Recipe} from '../../../common/models';
import {recipeService} from '../services/RecipeService';
import ConfirmModal from './Modal.vue';

export default Vue.extend({
    components: {
        ConfirmModal
    },
    props: {
        recipe: Object
    },
    data() {
        return {
            isModalVisible: false,
        }
    },
    methods: {
        confirmDelete() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        deleteRecipe() {
            recipeService.deleteRecipe(this.recipe.id).then(() => {
                this.$router.push({ path: `/recipes` });
                window.location.reload(true);
            });
        }
    }
});
</script>

<style scoped>
p {
    color: black;
    text-transform: none;
    padding: 1em;
}
</style>
