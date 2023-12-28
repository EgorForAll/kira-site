<template>
    <Header />
    <div class="container">
        <div class="row justify-content-center custom-row pt-5">
            <div class="col-md-8">

                <div class="alert alert-danger" role="alert" v-if="error !== null">
                    {{ error }}
                </div>

                <div v-if="!isLoading" class="card card-default">
                    <div class="card-header">Изменения пароля</div>
                    <div class="card-body">
                        <form>

                            <div class="form-group mb-3 row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Старый пароль</label>
                                <div class="col-md-6">
                                    <input v-model.trim="v$.oldPassword.$model" id="password" type="password" class="form-control" v-model="password"
                                           required autocomplete="off">
                                </div>
                            </div>                            <div class="form-group mb-3 row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Новый пароль</label>
                                <div class="col-md-6">
                                    <input v-model.trim="v$.newPassword.$model" id="password" type="password" class="form-control" v-model="password"
                                           required autocomplete="off">
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Еще раз новый пароль</label>
                                <div class="col-md-6">
                                    <input v-model.trim="v$.newPasswordMore.$model" id="password" type="password"
                                           class="form-control"
                                           required autocomplete="off">
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
                <Spinner v-else />
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../layout/Header.vue";
import Spinner from "../ui/Spinner.vue";
import {useVuelidate} from '@vuelidate/core'
import {required} from '@vuelidate/validators'
import {isIncludesHtml} from "@/utils.js";
export default {
    name: 'ChangePassword',
    components: {Header, Spinner},
    data() {
        return {
            isLoading: false,
            oldPassword: "",
            newPassword: '',
            newPasswordMore: '',
            error: null
        }
    },
    setup() {
        return {v$: useVuelidate()}
    },
    validations() {
        return {
            oldPassword: {required, isIncludesHtml},
            newPassword: {required, isIncludesHtml},
            newPasswordMore: {required, isIncludesHtml},
        }
    },
    methods: {
        async handleSubmit(e) {
            e.preventDefault()
            const isFormCorrect = await this.v$.$validate()
            if (isFormCorrect) {
                this.isLoading = true
                this.$axios.get('/sanctum/csrf-cookie').then(response => {
                    this.$axios.post('api/login', {
                        email: this.email,
                        password: this.password
                    })
                        .then(response => {
                            if (response.data.success) {
                                this.$router.push('/')
                            } else {
                                this.error = response.data.message
                            }
                        })
                        .catch(function (error) {
                            alert(`Произошла ошибка ${error}. Попробуйте еще раз`);
                        }).finally(() => this.isLoading = false);
                })
            } else {
                alert('Проверьте правильность заполненных полей')
            }
        }
    },
}
</script>

<style scoped>

.custom-row {
    min-height: 400px;
    position: relative;
}

.custom-row .spinner-border {
    position: absolute;
    width: 31px;
    height: 31px;
    top: 50%;
    left: 50%;
    margin-top: -15px;
    margin-left: -15px;
}
</style>
