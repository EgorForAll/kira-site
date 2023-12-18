<template>
    <Header />
    <div class="container">
        <div class="row justify-content-center pt-5">
            <div class="col-md-8">

                <div class="alert alert-danger" role="alert" v-if="error !== null">
                    {{ error }}
                </div>

                <div class="card card-default">
                    <div class="card-header">Авторизация</div>
                    <div class="card-body">
                        <form>
                            <div class="form-group mb-3 row">
                                <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail Address</label>
                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" v-model="email" required
                                           autofocus autocomplete="off">
                                </div>
                            </div>

                            <div class="form-group mb-3 row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" v-model="password"
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
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../layout/Header.vue";
export default {
    name: 'Auth',
    components: {Header},
    data() {
        return {
            email: "",
            password: "",
            error: null
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            if (this.password.length > 0) {
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
                        });
                })
            }
        }
    },
}
</script>
