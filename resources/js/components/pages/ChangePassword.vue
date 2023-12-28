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
                                    <input v-model.trim="v$.oldPassword.$model" id="password" type="password" class="form-control"
                                           required autocomplete="off">
                                </div>
                            </div>                            <div class="form-group mb-3 row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Новый пароль</label>
                                <div class="col-md-6">
                                    <input v-model.trim="v$.newPassword.$model" id="password" type="password"  :class="error ? 'form-control input-error' : 'form-control'"
                                           required autocomplete="off">
                                </div>
                            </div>
                            <div class="form-group mb-3 row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Еще раз новый пароль</label>
                                <div class="col-md-6">
                                    <input v-model.trim="v$.newPasswordMore.$model" id="password" type="password"
                                           :class="error ? 'form-control input-error' : 'form-control'"
                                           required autocomplete="off">
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary me-3" @click="handleSubmit">
                                        Изменить
                                    </button>
                                    <button type="reset" class="btn btn-secondary">
                                        Сброс
                                    </button>
                                    <router-link class="ms-3" :to="{name: 'reset'}">Забыли пароль?</router-link>
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

const comparePasswords = (a, b) => a === b;

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
            const isEqual = comparePasswords(this.newPassword, this.newPasswordMore);
            if (isEqual === false) {
                this.error = 'Пароли не совпадают'
            }
            if (isFormCorrect && isEqual) {
                console.log('yes')
                // this.isLoading = true
                // this.$axios.get('/sanctum/csrf-cookie').then(response => {
                //     this.$axios.post('api/login', {
                //         email: this.email,
                //         password: this.password
                //     })
                //         .then(response => {
                //             if (response.data.success) {
                //                 this.$router.push('/')
                //             } else {
                //                 this.error = response.data.message
                //             }
                //         })
                //         .catch(function (error) {
                //             alert(`Произошла ошибка ${error}. Попробуйте еще раз`);
                //         }).finally(() => this.isLoading = false);
                // })
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

.input-error {
    border: 1px solid red;
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
