<template>
    <div class="navigation-container">
        <ul class="navigation">
            <router-link v-for="route in routes" :key="route.id" tag="li" :to="route.path">
                <a>{{ $t(route.name) }}</a>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        routes () {
            return this.$router.options.routes.filter(route => route.inTopNavigation)
        }
    }
}
</script>

<style scoped>
.navigation-container {
    padding: 1.5em;
    background: url('../images/vegetables.jpg') repeat-x center;
    border-bottom: 1px solid var(--content-color);
}

.navigation {
    list-style: none;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: var(--light-background-color);
}

.navigation li {
    margin: 0.5em 1.0em;
    text-transform: uppercase;
}

.navigation li a {
    color: var(--content-color);
    text-decoration: none;
}

.router-link-active {
    font-weight: bolder;
}

@media screen and (min-width: 500px) {
    .navigation {
        flex-direction: row;
        flex-wrap: wrap;
    }
}
</style>