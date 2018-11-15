<template>
<transition name="modal-fade">
    <div class="modal-backdrop">
        <div class="modal">
            <header slot="header" class="modal-header">{{ $t('confirmAction') }}</header>

            <slot name="content" class="modal-content"></slot>

            <footer slot="footer" class="modal-footer">
                <button 
                    v-on:click.prevent.stop="cancel()">{{ $t('cancel') }}</button>
                <button 
                    class="action-button"
                    v-on:click.prevent.stop="confirm()">{{ $t('confirm') }}</button>
            </footer>
        </div>
    </div>
</transition>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
    },
    methods: {
        cancel() {
            this.$emit('cancel');
        },
        confirm() {
            this.$emit('confirm');
        }
    }
});
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.modal-header,
.modal-footer {
    padding: 15px;
    display: flex;
}

.modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
}

.modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
}

.modal-fade-enter,
.modal-fade-leave-active {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity .5s ease
}
</style>
