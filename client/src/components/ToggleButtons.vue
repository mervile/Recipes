<template>
    <div class="toggle-buttons">
        <h3>{{ $t(label) }}</h3>
        <toggle-button
            v-for="button in buttons" :key="button.id"
            v-bind:button="button"
            v-bind:disabled="keepActive && button.active"
            v-bind:class="{active: button.active}"
            v-on:value-changed="onChange"></toggle-button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ToggleButton from './ToggleButton.vue';

export default Vue.extend({
    components: {
        ToggleButton
    },
    props: {
        label: String,
        buttons: Array,
        keepActive: Boolean
    },
    methods: {
        onChange (data) {
            this.$props.buttons.forEach(button => {
                if (button.value === data.value) {
                    button.active = this.$props.keepActive ? true : data.active;
                } else {
                    button.active = false;
                }
            });
            this.$emit('value-changed', data);
        }
    }
});
</script>

<style scoped>
button {
    text-transform: uppercase;
    background-color: darkblue;
    color: white;
    border: 1px solid darkblue;
    margin: 1em 1px;
}

.active {
    background-color: greenyellow;
    border: 1px greenyellow;
    color: darkblue;
}
</style>
