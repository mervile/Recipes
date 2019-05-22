<template>
    <div class="dropdown-container">
        <button :id="toggleId"
            class="dropdown-toggle"
            @click.stop.prevent="toggle()"
            @keydown.space.self="toggle()">
            <slot name="toggle">Toggle</slot>
        </button>

        <div :id="id"
            class="dropdown"
            tabindex="0"
            :style="position"
            @keydown.esc.self="toggle()">
            <slot v-if="open">Dropdown content</slot>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as _ from 'lodash';

let dropdown: HTMLElement|null;

function recCheckFocus(node) {
    if (document.hasFocus() && document.activeElement === node) {
        return true;
    } else if (node.childNodes.length === 0) {
        return false;
    }
    return _.some(node.childNodes, childNode => recCheckFocus(childNode));
}

export default Vue.extend({
    props: {
        id: String,
        dropdownPosition: Object,
        appendToBody: Boolean,
        appendToDropdown: Object  // In case dropdown is in another dropdown // TODO test
    },
    mounted() {
        dropdown = document.getElementById(this.id);
        if (!dropdown) {
            throw new Error("Dropdown element with id " + this.id + " not found!");
        }

        if (this.appendToBody) {
            document.body.appendChild(dropdown);
        }

        if (!this.dropdownPosition) {
            this.calcPosition();
        }

        if (this.appendToDropdown) {
            this.appendToDropdown.appendChild(dropdown);
        }

        document.addEventListener('click', this.checkFocus);
        window.addEventListener('resize', this.calcPosition);
    },
    beforeDestroy() {
        if (this.appendToBody && dropdown) {
            document.body.removeChild(dropdown);
        }

        document.removeEventListener('click', this.checkFocus);
        window.removeEventListener('resize', this.calcPosition);
    },
    data() {
        return {
            open: false,
            position: this.dropdownPosition,
            toggleId: this.id + '-toggle'
        }
    },
    methods: {
        toggle() {
            this.open = !this.open;

            if (dropdown) {
                if (this.open) {
                    dropdown.focus();
                } else {
                    dropdown.blur();
                }
            }
        },
        calcPosition() {
            const toggle = document.getElementById(this.toggleId);
            if (toggle) {
                const pos = toggle.getBoundingClientRect();
                const isBelowToggle = pos.top < (document.body.offsetHeight/2);
                const isLeftAligned = pos.left < (document.body.offsetWidth/2);
                let top, left, right, bottom;

                if (isBelowToggle) {
                    top = this.appendToBody ? pos.top + pos.height + 'px' : pos.height + 'px';
                } else {
                    bottom = this.appendToBody ? (document.body.offsetHeight-pos.top) + 'px' : pos.height + 'px';
                }

                if (isLeftAligned) {
                    left = this.appendToBody ? pos.left + 'px' : '0px';
                } else {
                    right = this.appendToBody ? (document.body.offsetWidth-pos.right) + 'px' : '0px';
                }

                this.position = {top, left, bottom, right};
            }
        },
        hasFocus() {
            // Check if this element or any of its child elements has focus. If not - close dropdown.
            const dropdown = document.getElementById(this.id);
            if (dropdown) {
                return recCheckFocus(dropdown);
            }
        },
        checkFocus() {
            if (this.open && !this.hasFocus()) {
                this.toggle();
            }
        }
    }
});
</script>

<style>
.dropdown-toggle {
    margin: 0;
}

.dropdown-container {
    position: relative;
}

.dropdown {
    position: absolute;
}
</style>
