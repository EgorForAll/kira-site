<template>
    <Header/>
    <div class="container pt-3">
        <div class="row justify-content-center custom-row pt-5">
            <div class="col-md-8">

                <div class="alert alert-danger" role="alert" v-if="error !== null">
                    {{ error }}
                </div>

                <div v-if="!isLoading" class="card card-default">
                    <div class="card-header">Регистрация</div>
                    <div class="card-body">
                        <form>
                            <div class="form-group mb-3 row">
                                <label for="name" class="col-sm-4 col-form-label text-md-right">Имя</label>
                                <div class="col-md-6">
                                    <input v-model.trim="v$.name.$model" id="name" type="email" class="form-control" v-model="name" required
                                           autofocus autocomplete="off">
                                    <p class="error" v-if="v$.name.minLength.$invalid">Введите более двух символов</p>
                                </div>
                            </div>

                            <div class="form-group mb-3 row">
                                <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail</label>
                                <div class="col-md-6">
                                    <input v-model.trim="v$.email.$model" id="email" type="email" class="form-control" v-model="email" required
                                           autofocus autocomplete="off">
                                    <p v-if="v$.email.email.$invalid" class="error">Некорректный адрес электронной почты</p>
                                </div>
                            </div>

                            <div class="form-group mb-3 row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Пароль</label>
                                <div class="col-md-6">
                                    <input v-model.trim="v$.password.$model" id="password" type="password" class="form-control" v-model="password"
                                           required autocomplete="off">
                                    <p class="error" v-if="v$.password.minLength.$invalid">Введите не менее 6 символов</p>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary" @click="handleSubmit">
                                        Зарегистрироваться
                                    </button>
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
import {required, minLength, email} from '@vuelidate/validators'
import {isIncludesHtml, isName, isPassword} from "@/utils.js";

export default {
    name: 'Register',
    components: {Header, Spinner},
    setup() {
        return {v$: useVuelidate()}
    },
    data() {
        return {
            name: "",
            email: "",
            password: "",
            error: null,
            isLoading: false
        }
    },
    validations() {
        return {
            name: {required, minLength: minLength(2), isIncludesHtml, isName},
            email: {required, email, isIncludesHtml},
            password: {required, minLength: minLength(6), isPassword, isIncludesHtml}
        }
    },
    methods: {
        async handleSubmit(e) {
            e.preventDefault()
            const isFormCorrect = await this.v$.$validate()
            if (isFormCorrect) {
                this.isLoading = true;
                axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post('api/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    })
                        .then(response => {
                            if (response.data.success) {
                                this.$router.push({name: 'auth'})
                            } else {
                                this.error = response.data.message
                            }
                        })
                        .catch(function (error) {
                            throw  new error
                        }).finally(() => this.isLoading = false);
                })
            } else {
                alert('Проверьте правильность заполненных полей')
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.error {
    color: #d34e4e;
}
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
}
</style>
