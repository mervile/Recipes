<template>
    <ul class="navigation">
        <router-link v-for="route in routes" :key="route.id" tag="li" :to="route.path">
            <a>{{ $t(route.name) }}</a>
        </router-link>
    </ul>
</template>

<script>
export default {
    computed: {
        routes () {
            return this.$router.options.routes.filter(route => !route.redirect)
        }
    }
}
</script>

<style>
.navigation {
    list-style: none;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 1em;
    background-color: lavenderblush;
    border-bottom: 1px solid pink;
}

.navigation li {
    margin: 1.0em;
    text-transform: uppercase;
}

@media screen and (max-width: 500px) {
    .navigation {
        flex-direction: column;
        align-items: center;
    }
}
</style>