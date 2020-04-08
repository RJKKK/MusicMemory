const user = {
    state: {
        name: undefined,
        account:undefined,
        email:undefined,
        logoId:undefined,

    },
    mutations: {
        //set user
        SET_USER: (state, user) => {
            // state.user = user;
            for(let key in state){
                state[key] = user[key]
            }
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