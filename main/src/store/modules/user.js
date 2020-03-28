const user = {
    state: {
        user: null,
        account:null
    },
    mutations: {
        //set user
        SET_USER: (state, user) => {
            state.user = user;
        }
    },
    actions: {
        DelInfo({
                    commit
                }) {
            commit('SET_USER', null);
            // state.user = null;
        }
    }
};
export default user;