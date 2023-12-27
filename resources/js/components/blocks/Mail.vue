<script>
import {mapGetters} from "vuex";
import {useVuelidate} from '@vuelidate/core'
import {required, minLength} from '@vuelidate/validators'
import {isUser, isIncludesHtml} from "@/utils.js";
import Spinner from "@/components/ui/Spinner.vue";

export default {
    name: 'Mail',
    components: {Spinner},
    emits: ['onCloseMail'],
    data() {
        return {
            isLoading: false,
            isSuccess: false,
            isError: false,
            form: {
                from: '',
                subject: '',
                text: ''
            },
        }
    },
    setup() {
        return {v$: useVuelidate()}
    },
    methods: {
        onClickOut(e) {
            const inModal = e.composedPath().includes(this.$refs.modal)
            if (!inModal) {
                this.$emit('onCloseMail')
            }
        },
        onSubmit(e) {
            e.preventDefault()
            this.isLoading = true
            const data = {
                from: this.form.from,
                subject: this.form.subject,
                text: this.form.text
            }
            try {
                this.$axios.post('laravel_route/send', data).then((res) => {
                    if (res.status === 200) {
                        console.log(res)
                        this.isLoading = false
                        this.isSuccess = true
                    } else {
                        this.isLoading = false
                        this.isError = true
                    }
                })
            } catch (err) {
                this.isError = true
                this.isLoading = false
                throw  new  err;
            }

        }
    },
    computed: {
        ...mapGetters({
            user: "auth/getUser"
        })
    },
    validations() {
        return {
            form: {
                from: {required, isUser: isUser(this.user.name), isIncludesHtml},
                subject: {required, minLength: minLength(2), isIncludesHtml},
                text: {required, minLength: minLength(5), isIncludesHtml}
            }
        }
    },
    created() {
        if (this.user) {
            this.$data.form.from = this.user.name
        }
    },
    mounted() {
        setTimeout(() => window.addEventListener('click', this.onClickOut), 500)
    },
    beforeUnmount() {
        window.removeEventListener('click', this.onClickOut)
    }
}
</script>

<template>
    <div class="modal mail">
        <div class="modal-dialog modal-dialog-centered">
            <div ref="modal" class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Письмо Кире</h1>
                    <button @click="$emit('onCloseMail')" type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Закрыть"></button>
                </div>
                <form v-if="!isSuccess" class="form" action="" method="post">
                    <div class="modal-body">
                        <div class="form-item col-12">
                            <label class="form-label col-2" for="from">От кого:</label>
                            <input v-model="v$.form.from.$model" type="text" class="form-input col-8" name="from"
                                   id="from">
                            <p class="error col-8 mt-1 mb-1" v-if="v$.form.from.required.$invalid">Обязательное поле</p>
                            <p class="error col-8 mt-1 mb-1" v-if="v$.form.from.isUser.$invalid">Пожалуйста,
                                авторизируйтесь</p>
                        </div>
                        <div class="form-item col-12">
                            <label class="form-label col-2" for="subject">Тема:</label>
                            <input v-model="v$.form.subject.$model" type="text" class="form-input col-8" name="subject"
                                   id="subject">
                            <p class="error col-8 mt-1 mb-1" v-if="v$.form.subject.minLength.$invalid">Обязательное
                                поле</p>
                        </div>
                        <div class="form-item col-12">
                            <textarea v-model="v$.form.text.$model" class="form-input col-12"
                                      placeholder="Напишите сообщение"/>
                            <p class="error text-error col-8 mt-1 mb-1" v-if="v$.form.text.minLength.$invalid">
                                Обязательное поле</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <spinner v-if="isLoading"/>
                        <button @click="onSubmit" type="button" class="btn btn-primary">Отправить</button>
                        <button @click="$emit('onCloseMail')" type="button" class="btn btn-secondary"
                                data-bs-dismiss="modal">Отмена
                        </button>

                    </div>
                </form>
                <div v-if="isSuccess" class="success">
                    <div class="success-content">
                        <div v-if="isSuccess" class="success-msg">Ваше сообщение успешно доставлено!</div>
                        <div v-if="isError" class="success-msg">Произошла ошибка. Поробуйте позднее</div>
                        <button @click="$emit('onCloseMail')" type="button" :class="`btn ${isSuccess ? 'btn-success' : 'btn-secondary'} mt-3`"
                                data-bs-dismiss="modal">Ok
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

.success {
    padding: 20px;
    display: flex;
}

.modal-footer {
    .spinner-border {
        width: 20px;
        height: 20px;
        margin-right: 30px;
    }
}

.error {
    color: #d34e4e;
    margin: 0 auto;
}

.text-error {
    margin: 0;
}

.mail {
    position: absolute;
    display: block;
    border: 1px solid #bdbdbd;
}

.form-input {
    border: 1px solid #b9b9b9;
    border-radius: 5px;
    padding: 5px 10px;
}

.form-item {
    margin-bottom: 15px;

    textarea {
        height: 150px;
        resize: none;
    }
}

.form-label {
    flex-grow: 0.5;
}
</style>
