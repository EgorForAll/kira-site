const loadPosts = (url) =>
    fetch(url).then((res) => res.json());

export default {
    namespaced: true,
    state: {
        posts: [],
        currentPost: null,
        links: null,
        meta: null
    },
    mutations: {
        SET_POSTS(state, payload) {
            state.posts = state.posts.concat(payload)
        },
        SET_CURRENT_POST(state, payload) {
            state.currentPost = payload
        },
        SET_POST_PER_PAGE(state) {
            state.postsPerPage = state.postsPerPage + 9
        },
        SET_META(state, payload) {
            state.meta = payload
        },
        SET_LINKS(state, payload) {
            state.links = payload
        }
    },
    getters: {
        getPosts(state) {
            return state.posts;
        },
        getCurrentPost(state) {
            return state.currentPost
        },
        getPostsPerPage(state) {
            return state.postsPerPage
        },
        getLinks(state) {
            return state.links
        },
        getMeta(state) {
            return state.meta
        }
    },
    actions: {
        async fetchPosts({commit}, url) {
            try {
                const {data, meta, links} = await loadPosts(url);
                commit("SET_POSTS", data);
                commit("SET_LINKS", links);
                commit("SET_META", meta);
            } catch (err) {
                throw new err;
            }
        },
        setCurrentPost ({commit}) {
            commit('SET_CURRENT_POST')
        },
        setPostsPerPage({commit}) {
            commit('SET_POST_PER_PAGE')
        }
    },
};
