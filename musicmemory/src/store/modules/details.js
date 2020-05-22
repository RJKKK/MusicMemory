const details = {
    state: {
        account:undefined,
        data:null

    },
    mutations: {
        //set details
        SET_DETAIL: (state, details) => {
           state.account = details.account;
           state.data = {...details.data}
        }
    },
    actions: {
        DelInfo({
                    commit
                }) {
            commit('SET_DETAIL', null);
            // state.user = null;
        }
    }
};
export default details;