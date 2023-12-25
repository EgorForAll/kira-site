<script>
import KiraAvatar from "../../../assets/images/kira-avatar.jpg"
import ListSVG from "../../../assets/images/list.svg?component"
import TableSVG from "../../../assets/images/table.svg?component"

export default {
    name: 'Introduction',
    props: ['isTableView'],
    components: {ListSVG, TableSVG},
    data() {
        return {
            avatarUrl: KiraAvatar
        }
    },
}
</script>

<template>
    <section class="intro">
        <h2 class="intro__title">Знакомство с Кирой</h2>
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
                        <button class="intro__btn" :disabled="!isTableView" @click="$emit('setView')">
                            <ListSVG/>
                        </button>
                        <button class="intro__btn" :disabled="isTableView" @click="$emit('setView')">
                            <TableSVG/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

.intro__title {
    @include visually-hidden();
}

.intro__btn {
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #ABCDFF;
    width: auto;
    height: auto;
    background-color: transparent;
    @include trans(background-color, 0.3s);
    margin-right: 15px;

    &:hover {
        background-color: #ABCDFF80;
    }

    &:active {
        background-color: #ABCDFF;
    }

    &:disabled {
        background-color: #ABCDFF;
    }

    &:first-child {
        width: 61px;
        height: 62px;

        @media (max-width: $lg) {
            width: 50px;
            height: 50px;
        }
    }

    &:last-child {
        margin-right: 0;
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
    line-height: 35px;
    border: 1px solid #4C80CE;
    padding: 20px;
    border-radius: 20px;


    @media (max-width: $lg) {
        font-size: 18px;
        line-height: 23px;
    }
    @media (max-width: $md) {
        font-size: 12px;
        line-height: 15px;
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
    position: relative;
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

    &::after {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 200px;
        height: 150px;
        content: '';
        background-image: url("../../../assets/images/arrow.svg");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
}

.intro__row {
    display: grid;
    grid-auto-columns: 1fr 2fr;
}
</style>
