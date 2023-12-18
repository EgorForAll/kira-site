const loadComments = (postId) =>
    fetch(`http://127.0.0.1:8000/laravel_route/comments/${postId}`).then((res) =>
        res.json()
    ).then((res) => res.data);

export default {
    namespaced: true,
    state: {
        comments: [],
        postComments: [],
        isCommentsShown: false,
    },
    mutations: {
        SET_COMMENTS(state, payload) {
            state.comments = payload
        },
        SET_POST_COMMENTS(state, payload) {
            state.postComments = payload
        }
    },
    getters: {
        getComments(state) {
            return state.comments;
        },
        getPostComments(state) {
            return state.postComments
        }
    },
    actions: {
        async fetchComments({commit}, postId) {
            try {
                const request = await loadComments(postId);
                commit("SET_COMMENTS", request);
            } catch (err) {
                throw new err;
            }
        },
        async postComments({commit}, postId) {
            try {
                const request = await loadComments(postId)
                commit("SET_POST_COMMENTS", request)
            } catch (err) {
                throw  new err
            }
        }
    },
};
