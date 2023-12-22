<script>
import Spinner from "./Spinner.vue";
import DoneSVG from "../../../assets/images/done.svg?component"
import {mapActions, mapGetters} from "vuex";

export default  {
    name: 'DeleteWindow',
    components: {Spinner, DoneSVG},
    data() {
        return {
            isLoading: false,
            isSuccess: false
        }
    },
    props: ['postId'],
    methods: {
        ...mapActions({
            updatePosts: "posts/fetchPosts"
        }),
        ...mapActions({
            setCurrentPost: "posts/setCurrentPost"
        }),
        deletePost() {
            this.isLoading = true
            this.$axios.delete(`laravel_route/posts/delete/${this.currentPost.id}`).then((res) => {
                if (res.status === 200) {
                    this.updatePosts({url: 'http://127.0.0.1:8000/laravel_route/posts', isUpdate: true})
                    this.setCurrentPost(null)
                    this.isSuccess = true
                    this.isLoading = false
                }
            })
        }
    },
    computed: {
        ...mapGetters({
            currentPost: "posts/getCurrentPost"
        })
    }
}

</script>

<template>
    <div class="modal modal-delete">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button @click="$emit('closeDelete')" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                </div>
                <div class="modal-body">
                    <p v-if="!isSuccess">Вы действительно хотите удалить запись?</p>
                    <div class="succees-block d-flex align-items-center">
                        <DoneSVG v-if="isSuccess" />
                        <p class="success mb-0 ms-2" v-if="isSuccess">Пост был успешно удален </p>
                    </div>
                </div>
                <div class="modal-footer">
                    <spinner v-if="isLoading"/>
                    <button @click="deletePost" v-if="!isSuccess" type="button" class="btn btn-danger" data-bs-dismiss="modal" :disabled="isLoading">Удалить</button>
                    <button @click="$emit('closeDelete')" type="button" class="btn btn-primary">Закрыть</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal-delete {
    display: block !important;
}

.modal .spinner-border {
    width: 20px;
    height: 20px;
    margin-right: 20px;
}

</style>
