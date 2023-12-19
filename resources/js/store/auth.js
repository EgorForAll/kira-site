import axios from "axios";


export default {
    namespaced: true,
    state: {
        user: {},
        isAuth: false,
        error: ''
    },
    mutations: {
        SET_AUTH(state) {
            state.isAuth = !state.isAuth
        },
        SET_USER(state, payload) {
            state.user = {
                ...payload
            }
        },
        SET_ERR(state, payload) {
            state.error = payload
        },
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getAuth(state) {
            return state.isAuth
        }
    },
    actions: {
        async fetchUserData({commit}) {
            try {
                const request = await axios.get('http://127.0.0.1:8000/laravel_route/user');
                if (request.data.success) {
                    commit("SET_USER", request.data.messages);
                    commit("SET_AUTH")
                }
            } catch (err) {
                commit('SET_ERR', err.message)
            }

        },
        resetAuth({commit}) {
            commit("SET_AUTH");
            commit('SET_USER', null);
            commit('SET_ERR', '')
        }
    },
};
