import { createStore } from 'vuex'
import posts from "./posts.js";
import comments from "./comments.js";
export default createStore({
    modules: {posts, comments}
});
