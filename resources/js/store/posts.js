const loadPosts = () =>
    fetch("http://127.0.0.1:8000/posts").then((res) =>
        res.json()
    );

export default {
    namespaced: true,
    state: {
        posts: [],
    },
    mutations: {
        SET_POSTS(state, payload) {
            state.posts = payload
        },
    },
    getters: {
        getPosts(state) {
            return state.posts;
        },
    },
    actions: {
        async fetchPosts({ commit }) {
            try {
                const request = await loadPosts();
                commit("SET_POSTS", request);
            } catch (err) {
                throw new err;
            }
        },
    },
};
