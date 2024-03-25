import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            refresh: 'N',
        };
    },
    mutations: {
        changeRefresh(state, payLoad) {
            state.refresh = payLoad;
        },
    },
});

export default store;
