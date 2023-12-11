const loadComments = (postId) =>
    fetch(`http://127.0.0.1:8000/comments/${postId}`).then((res) =>
        res.json()
    ).then((res) => res.data);

export default {
    namespaced: true,
    state: {
        comments: [],
        isCommentsShown: false
    },
    mutations: {
        SET_COMMENTS(state, payload) {
            state.comments = payload
        }
    },
    getters: {
        getComments(state) {
            return state.comments;
        },
    },
    actions: {
        async fetchComments({commit}, postId) {
            try {
                const request = await loadComments(postId);
                commit("SET_COMMENTS", request);
            } catch (err) {
                throw new err;
            }
        }
    },
};
