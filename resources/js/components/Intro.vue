<script>
import KiraAvatar from "../../assets/images/kira-avatar.jpg"
import ListSVG from "../../assets/images/list.svg?component"
import TableSVG from "../../assets/images/table.svg?component"

export default {
    name: 'Intro',
    components: {ListSVG, TableSVG},
    data() {
        return {
            avatarUrl: KiraAvatar
        }
    }
}
</script>

<template>
    <section class="intro">
        <div class="container pt-3 pb-3 pt-md-4 pb-md-4">
            <div class="row intro__row">
                <div class="intro__avatar-wrapper">
                    <img :src="avatarUrl" alt="Аватарка Киры" class="intro__avatar" width="300" height="300">
                </div>
                <div class="intro__right">
                    <p class="intro__text">
                        Всем привет! Меня зовут Кира. Это мой интернет-блог!
                        Здесь я публикую фотографии и новости из моей кошачьей жизни!
                        Подписывайтесь на мой блог, пишите комментарии, а погладить меня можно лайками! Хочу делиться
                        своей радостью со всеми вами!
                    </p>
                    <div class="intro__views">
                        <button class="intro__btn">
                            <ListSVG/>
                        </button>
                        <button class="intro__btn">
                            <TableSVG/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@import "../../scss/main";

.intro__btn {
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #ABCDFF;
    width: auto;
    height: auto;
    background-color: transparent;
    @include trans(background-color, 0.3s);

    &:hover {
        background-color: #ABCDFF80;
    }

    &:active {
        background-color: #ABCDFF;
    }

    &:first-child {
        width: 61px;
        height: 62px;
        margin-right: 20px;
        @media (max-width: $lg) {
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }
    }
}

.intro__views {
    display: flex;
    justify-content: flex-end;
}

.intro__text {
    color: #4C80CE;
    text-align: justify;
    font-family: $base-font;
    font-size: 24px;
    font-style: normal;
    font-weight: 350;
    line-height: 35px; /* 145.833% */

    @media (max-width: $lg) {
        font-size: 18px;
        line-height: 23px;
    }
    @media (max-width: $md) {
        font-size: 14px;
        line-height: 20px;
    }
}

.intro__right {
    grid-column: 2/3;
    grid-row: 1/2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.intro__avatar-wrapper {
    grid-column: 1/2;
    grid-row: 1/2;
}

.intro__avatar {
    object-fit: cover;
    border-radius: 50%;
    border: 10px solid $blue;

    @media (max-width: $lg) {
        width: 200px;
        height: 200px;
        border-width: 5px;
    }
    @media (max-width: $md) {
        width: 150px;
        height: 150px;
        border-width: 3px;
    }
}

.intro__row {
    display: grid;
    grid-auto-columns: 1fr 2fr;
}
</style>
