import { createStore } from 'vuex'
import posts from "./posts.js";
import comments from "./comments.js";
import auth from "./auth.js"
export default createStore({
    modules: {posts, comments, auth}
});
