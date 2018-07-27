import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        paging: {
            page: 0,
            itemsPerPage: 10
        }
    },
    mutations: {
    }
});

export default store;