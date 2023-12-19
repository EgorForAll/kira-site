<template>
    <Header />
    <div class="container">
        <div class="row justify-content-center custom-row pt-5">
            <div class="col-md-8">

                <div class="alert alert-danger" role="alert" v-if="error !== null">
                    {{ error }}
                </div>

                <div v-if="!isLoading" class="card card-default">
                    <div class="card-header">Авторизация</div>
                    <div class="card-body">
                        <form>
                            <div class="form-group mb-3 row">
                                <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail</label>
                                <div class="col-md-6">
                                    <input v-model.trim="v$.email.$model" id="email" type="email" class="form-control" v-model="email" required
                                           autofocus autocomplete="off">
                                </div>
                            </div>

                            <div class="form-group mb-3 row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Пароль</label>
                                <div class="col-md-6">
                                    <input v-model.trim="v$.password.$model" id="password" type="password" class="form-control" v-model="password"
                                           required autocomplete="off">
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary me-3" @click="handleSubmit">
                                        Вход
                                    </button>
                                    <router-link  :to="{name: 'register'}" class="btn btn-secondary">
                                        Регистрация
                                    </router-link>
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
    name: 'Auth',
    components: {Header, Spinner},
    data() {
        return {
            isLoading: false,
            email: "",
            password: "",
            error: null
        }
    },
    setup() {
        return {v$: useVuelidate()}
    },
    validations() {
        return {
            email: {required, isIncludesHtml},
            password: {required, isIncludesHtml}
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
