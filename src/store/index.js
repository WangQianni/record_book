import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import state from './modules/state';
import getters from './modules/getters';
import mutations from './modules/mutations';
import actions from './modules/actions';

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})