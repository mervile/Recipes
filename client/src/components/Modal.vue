<template>
<transition name="modal-fade">
    <div class="modal-backdrop" v-on:keydown.self.esc="close()" tabindex="0" v-on:click.self="close()">
        <div class="modal">
            <header class="modal-header">
                <slot name="header"></slot>
            </header>

            <slot class="modal-content"></slot>

            <footer class="modal-footer">
                <slot name="footer">
                    <button 
                        class="action-button"
                        v-on:click.prevent.stop="close()">{{ $t('close') }}</button>
                </slot>
            </footer>
        </div>
    </div>
</transition>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    mounted() {
        this.$el.focus();
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
});
</script>

<style>
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
