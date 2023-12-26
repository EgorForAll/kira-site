<script>
import {mapGetters} from "vuex";
import {useVuelidate} from '@vuelidate/core'
import {required, minLength} from '@vuelidate/validators'
import {isUser, isIncludesHtml} from "@/utils.js";

export default {
    name: 'Mail',
    emits: ['onCloseMail'],
    data() {
      return {
          from: '',
          theme: '',
          text: ''
      }
    },
    setup() {
        return {v$: useVuelidate()}
    },
    methods: {
        onPressEsc(e) {
            e.preventDefault()
            if (e.key === 'Escape' || e.key === 'Esc') {
                this.$emit('onCloseMail')
            }
        },
        onClickOut(e) {
            const inModal = e.composedPath().includes(this.$refs.modal)
            if (!inModal) {
                this.$emit('onCloseMail')
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
            from: {required, isUser: isUser(this.user.name), isIncludesHtml},
            theme: {required, minLength: minLength(2), isIncludesHtml},
            text: {required, minLength: minLength(5), isIncludesHtml}
        }
    },
    created() {
        if (this.user) {
        this.$data.from = this.user.name
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
                <form class="form" action="" method="post">
                    <div class="modal-body">
                        <div class="form-item col-12">
                            <label class="form-label col-2" for="from">От кого:</label>
                            <input v-model="v$.from.$model" type="text" class="form-input col-8" name="from"
                                   id="from">
                            <p class="error col-8 mt-1 mb-1" v-if="v$.from.required.$invalid">Обязательное поле</p>
                            <p class="error col-8 mt-1 mb-1" v-if="v$.from.isUser.$invalid">Пожалуйста, авторизируйтесь</p>
                        </div>
                        <div class="form-item col-12">
                            <label class="form-label col-2" for="theme">Тема:</label>
                            <input v-model="v$.theme.$model" type="text" class="form-input col-8" name="theme"
                                   id="theme">
                            <p class="error col-8 mt-1 mb-1" v-if="v$.theme.minLength.$invalid">Обязательное поле</p>
                        </div>
                        <div class="form-item col-12">
                            <textarea v-model="v$.text.$model" class="form-input col-12"
                                      placeholder="Напишите сообщение"/>
                            <p class="error text-error col-8 mt-1 mb-1" v-if="v$.text.minLength.$invalid">Обязательное поле</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Отправить</button>
                        <button @click="$emit('onCloseMail')" type="button" class="btn btn-secondary"
                                data-bs-dismiss="modal">Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

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
