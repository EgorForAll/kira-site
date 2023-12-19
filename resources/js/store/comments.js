export const loadComments = (postId) =>
    fetch(`http://127.0.0.1:8000/laravel_route/comments/${postId}`).then((res) =>
        res.json()
    ).then((res) => res.data);

export default {
    namespaced: true,
    state: {
        postComments: [],
        isCommentsShown: false,
    },
    mutations: {
        SET_POST_COMMENTS(state, payload) {
            state.postComments = payload
        }
    },
    getters: {
        getPostComments(state) {
            return state.postComments
        }
    },
    actions: {
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
