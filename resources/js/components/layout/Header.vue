<template>
    <header class="header">
        <div class="container header__container pt-2 pb-2 pt-md-3 pb-md-3 pt-lg-4 pb-lg-4">
            <div class="row justify-content-between align-items-center">
                <LogoSVG/>
                <nav class="header__nav d-flex align-items-center">
                    <a v-if="isAuth" href="#" class="header__link me-2">{{ user.name }}</a>
                    <a v-else href="#" class="header__link">Войти</a>
                    <AvatarSVG/>
                </nav>
            </div>

        </div>
    </header>
</template>

<script>
import LogoSVG from "../../../assets/images/logo.svg";
import AvatarSVG from "../../../assets/images/avatar.svg?component";
import {mapGetters} from "vuex";

export default {
    name: 'Header',
    components: {AvatarSVG, LogoSVG},
    computed: {
        ...mapGetters({
            user: 'auth/getUser',
        }),
        ...mapGetters({
            isAuth: 'auth/getAuth'
        })
    },
}
</script>

<style lang="scss">
@import "../../../scss/main";

.header__nav {
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
</style>
