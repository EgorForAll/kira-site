import axios from "axios";
const loadPosts = (url) =>
    fetch(url).then((res) => res.json());

export default {
    namespaced: true,
    state: {
        posts: [],
        currentPost: null,
        links: null,
        meta: null,
        postsPerPage: 9,
        isCreateNew: false
    },
    mutations: {
        SET_POSTS(state, payload) {
            state.posts = state.posts.concat(payload)
        },
        SET_CURRENT_POST(state, payload) {
            state.currentPost = payload
        },
        SET_META(state, payload) {
            state.meta = payload
        },
        SET_LINKS(state, payload) {
            state.links = payload
        },
        SET_POSTS_PER_PAGE(state) {
            state.postsPerPage = state.postsPerPage + 9
        },
        SET_CREATE_NEW(state) {
            state.isCreateNew = !state.isCreateNew
        }
    },
    getters: {
        getPosts(state) {
            return state.posts;
        },
        getCurrentPost(state) {
            return state.currentPost
        },
        getLinks(state) {
            return state.links
        },
        getMeta(state) {
            return state.meta
        },
        getPostsPerPage(state) {
            return state.postsPerPage
        },
        getCreateNew(state){
            return state.isCreateNew
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
        setCurrentPost ({commit}, payload) {
            commit('SET_CURRENT_POST', payload)
        },
        setPostsPerPage({commit}) {
            commit('SET_POSTS_PER_PAGE')
        },
        setCreateNew({commit}) {
            commit('SET_CREATE_NEW')
        }
    },
};
