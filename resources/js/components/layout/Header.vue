<script>
import LogoSVG from "../../../assets/images/logo.svg";
import AvatarSVG from "../../../assets/images/avatar.svg?component";
import Popup from "../ui/Popup.vue";
import {mapGetters, mapActions} from "vuex";

export default {
    name: 'Header',
    data() {
        return {
            isLinkShown: false
        }
    },
    components: {AvatarSVG, LogoSVG, Popup},
    methods: {
        ...mapActions({
            resetAuth: "auth/resetAuth"
        }),
        onLogOut() {
            this.$axios.get('/sanctum/csrf-cookie').then(response => this.$axios.post('api/logout')).then(res => {
                if (res.status === 200) {
                    this.resetAuth()
                    this.isLinkShown = false;
                }
            })
        },
    },
    computed: {
        ...mapGetters({
            user: 'auth/getUser',
        }),
        ...mapGetters({
            isAuth: 'auth/getAuth'
        }),
    }
}
</script>

<template>
    <header class="header">
        <div class="container header__container pt-2 pb-2 pt-md-3 pb-md-3 pt-lg-4 pb-lg-4">
            <div class="row justify-content-between align-items-center">
                <div class="header__logo-wrapper">
                    <router-link :to="{name: 'home'}">
                        <LogoSVG/>
                    </router-link>
                </div>
                <nav class="header__nav d-flex align-items-center">
                    <a @click="isLinkShown = !isLinkShown" v-if="isAuth" class="header__link me-2">{{
                            user.name
                        }}</a>
                    <router-link :to="{name: 'auth'}" v-else href="#" class="header__link">Войти</router-link>
                    <popup v-if="isLinkShown" @on-log-out="onLogOut" @on-close-popup="isLinkShown = false"/>
                    <AvatarSVG/>
                </nav>
            </div>

        </div>
    </header>
</template>

<style lang="scss">
@import "../../../scss/main";

.header__logo-wrapper {
    width: min-content;
}

.header__nav {
    position: relative;
    width: min-content;
}

.header {
    width: 100%;
}

.header__link {
    color: rgb(33, 37, 41);
    text-align: justify;
    font-family: $base-font;
    font-size: 18px;
    font-style: normal;
    font-weight: 350;
    line-height: 35px;
    margin-right: 20px;
    text-decoration: none;
    @media (max-width: $lg) {
        font-size: 20px;
        line-height: 23px;
    }
    @media (max-width: $md) {
        font-size: 12px;
        line-height: 25px;
    }
}

nav {
    width: min-content;
}

.out {
    padding: 5px;
    font-size: 14px;
    line-height: 18px;
    position: absolute;
    top: 40px;
    left: 5px;
    border: 1px solid #4a5568;
    border-radius: 5px;
    @media (max-width: $md) {
        font-size: 9px;
        padding: 2px;
        top: 24px;
        left: 9px;
    }
}

</style>
