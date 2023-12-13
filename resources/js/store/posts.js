const loadPosts = () =>
    fetch("http://127.0.0.1:8000/posts").then((res) =>
        res.json()
    ).then((res) => res.data);

export default {
    namespaced: true,
    state: {
        posts: [],
        currentPost: null,
    },
    mutations: {
        SET_POSTS(state, payload) {
            state.posts = payload
        },
        SET_CURRENT_POST(state, payload) {
            state.currentPost = payload
        }
    },
    getters: {
        getPosts(state) {
            return state.posts;
        },
        getCurrentPost(state) {
            return state.currentPost
        }
    },
    actions: {
        async fetchPosts({commit}) {
            try {
                const request = await loadPosts();
                commit("SET_POSTS", request);
            } catch (err) {
                throw new err;
            }
        },
        setCurrentPost ({commit}, post) {
            commit('SET_CURRENT_POST', post)
        }
    },
};
