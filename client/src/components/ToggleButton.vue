<template>
    <button v-on:click.stop.prevent="onClick()">{{ $t(button.label) }}</button>
</template>

<script lang="ts">
import Vue from 'vue';

interface ToggleButtonI {
    id: String,
    active: Boolean,
    label: String,
    value: String,
}

export default Vue.extend({
    props: {
        button: Object
    },
    methods: {
        onClick () {
            this.$props.button.active = !this.$props.button.active;
            this.$emit('value-changed', this.$props.button);
        }
    }
});
</script>

<style scoped>

</style>
