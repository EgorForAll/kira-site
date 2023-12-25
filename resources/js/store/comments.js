export const loadCommentsById = (postId) =>
    fetch(`http://127.0.0.1:8000/laravel_route/comments/${postId}`).then((res) =>
        res.json()
    ).then((res) => res.data);

export const loadAllComments = () =>
    fetch(`http://127.0.0.1:8000/laravel_route/comments`).then((res) =>
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
        SET_POST_COMMENTS(state, payload) {
            state.postComments = payload
        },
        SET_COMMENTS(state, payload) {
            state.comments = payload
        },
        ADD_COMMENTS(state, payload) {
            state.comments = [...state.comments, payload]
д        }
    },
    getters: {
        getPostComments(state) {
            return state.postComments
        },
        getComments(state) {
            return state.comments
        }
    },
    actions: {
        async postComments({commit}, postId) {
            try {
                const request = await loadComments(postId)
                commit("SET_POST_COMMENTS", request)
            } catch (err) {
                throw new err
            }
        },
        async fetchComments({commit}) {
            try {
                    const request = await loadAllComments()
                    commit("SET_COMMENTS", request)
                } catch (err) {
                    throw  new err
                }
            },
        addComment({commit}, payload) {
            commit("ADD_COMMENTS", payload)
        }
    },
};
