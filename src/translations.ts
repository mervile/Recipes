import * as en from './languages/en.json';
import * as fi from './languages/fi.json';

import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'fi',
    messages: {
        en,
        fi
    }
});

export default i18n;