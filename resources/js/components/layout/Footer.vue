<script>
import LogoSVG from "../../../assets/images/logo.svg";

export default {
    name: 'Footer',
    components: {LogoSVG},
    emits: ['onClickMail']
}
</script>

<template>
    <footer class="footer">
        <div class="container">
            <div class="row row-footer justify-content-between align-items-center pb-lg-4 pt-lg-4 pb-3 pt-3">
                <div class="footer__logo-wrapper">
                    <router-link :to="{name: 'home'}">
                        <LogoSVG />
                    </router-link>
                </div>
                <ul class="footer__list">
                    <li class="footer__list-item">
                        <a href="#top" class="footer__link">Навверх</a>
                    </li>
                    <li class="footer__list-item">
                        <button @click="$emit('onClickMail')" class="footer__link">Связаться с Кирой</button>
                    </li>
                    <li class="footer__list-item">
                        <button href="#" class="footer__link">Подписаться на рассылку</button>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

.footer__logo-wrapper {
    width: min-content;
}

.footer__list-item {
    button {
        border: none;
        background-color: transparent;
    }
}

.footer__list {
    width: 27%;

    @media (max-width: $lg) {
        width: 41%;
    }

    @media (max-width: $md) {
        width: 45%;
    }
}

.footer {
    width: 100%;
}

.row-footer {
    border-top: 1px solid #333;
}

.footer__link {
    color: #4C80CE;
    text-align: justify;
    font-family: $base-font;
    font-size: 24px;
    font-style: normal;
    font-weight: 350;
    line-height: 35px;
    text-decoration: none;
    @include trans(color, 0.2s);
    @media (max-width: $lg) {
        font-size: 20px;
        line-height: 23px;
    }
    @media (max-width: $md) {
        font-size: 12px;
        line-height: 25px;
    }

    &:hover {
        color: #415279;
    }
}
</style>
