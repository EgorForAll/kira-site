<script>
export default {
    name: 'Popup',
    emits: ['onLogOut', 'onClosePopup'],
    methods: {
        onClickOut(e) {
            const inModal = e.composedPath().includes(this.$refs.popup)
            if (!inModal) {
                this.$refs.popup.classList.remove('opacity-in')
                this.$refs.popup.classList.add('opacity-out');
                setTimeout(() => this.$emit('onClosePopup'), 401)
            }
        },
    },
    mounted() {
        setTimeout(() => window.addEventListener('click', this.onClickOut), 400)

    },
    beforeUnmount() {
       window.removeEventListener('click', this.onClickOut)
    }
}
</script>

<template>
    <div ref="popup" class="popup opacity-in">
        <ul class="popup-list m-0">
            <li class="popup-list__item"><router-link class="popup__link" :to="{name: 'change'}">Изменить пароль</router-link></li>
            <li class="popup-list__item">
                <button type="button" class="popup__logout" @click="$emit('onLogOut')">Выйти</button>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

.opacity-out {
    opacity: 1;
    animation: custom-opacity-out 0.3s forwards;
}

.opacity-in {
    opacity: 0;
    animation: custom-opacity-in 0.3s forwards;
}

.popup__link {
    text-decoration: none;
    color: #000;
    @include trans(color, 0.3s);
    &:hover {
        color: #415279;
    }
}
.popup__logout {
    width: 100%;
    padding: 0;
    background-color: transparent;
    border: none;
    color: #000;
    @include trans(color, 0.3s);
    &:hover {
        color: #415279;
    }
}
.popup {
    width: 200px;
    top: 52px;
    left: -48px;
    position: absolute;
    padding: 10px;
    border: 1px solid #4a5568;
    background-color: #dee6ff;
    border-radius: 5px;
    box-shadow: 0 0 4px -1px #4a5568;
}

.popup-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.popup-list__item {
    text-align: center;
    padding-bottom: 10px;

    &:last-child {
        padding-top: 5px;
        border-top: 1px solid #4a5568;
        padding-bottom: 0;
    }
}
</style>
