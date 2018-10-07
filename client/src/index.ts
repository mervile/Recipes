import Vue from 'vue';
import './main.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import router from './routes';
import i18n from './translations';
import store from './store';

import RecipesMain from './components/Main.vue';

Vue.component('font-awesome-icon', FontAwesomeIcon)
  
const app = new Vue({
    router,
    i18n,
    store,
    el: '#recipes-app',
    components: {
        RecipesMain
    },
    template: '<recipes-main></recipes-main>'
});
