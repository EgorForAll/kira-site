import axios from "axios";



export default {
    namespaced: true,
    state: {
        user: null,
        isAuth: false
    },
    mutations: {
        SET_AUTH(state) {
            state.isAuth = true
        },
        SET_USER(state, payload) {
            state.user = {
                ...payload
            }
        }
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
                commit("SET_USER", request.data);
                commit("SET_AUTH")
            } catch (err) {
                console.log(err)
            }
        }
    },
};
