<template>
    <header class="v-app-header app-flex app-flex--row app-flex--justify_space-between app-flex--align_center app-width-gutter"
            :class="{
                'is-open': useMenuIsOpen().value
            }"
    >
        <nuxt-link class="v-app-header__logo-container app-flex"
                   href="/"
        >
            <img
                class="v-app-header__icon"
                src="../assets/icons/leCinematographe-icon.svg"
                alt="logo cinematographe.ch"
            />
            <img
                class="v-app-header__logo"
                src="../assets/icons/leCinematographe-logo_type--white.svg"
                alt="logo cinematographe.ch"
            />
        </nuxt-link>
        <div class="app-flex">
            <button class="app-header__icon-menu app-flex app-flex--gap_large app-flex--align_center"
                @click="menuIsOpen = !menuIsOpen"
            >Menu
                <img class="app-header__icon-menu__img"
                     v-if="menuIsOpen"
                     alt="open menu"
                     src="@/assets/icons/close_FILL0_wght400_GRAD0_opsz24.svg"
                />
                <img class="app-header__icon-menu__img"
                     v-else
                     alt="close menu"
                     src="@/assets/icons/icon-menu.svg"
                />
            </button>
        </div>
    </header>
</template>





<script lang="ts" setup>
const menuIsOpen = useMenuIsOpen()
</script>





<style lang="scss" scoped >
.v-app-header {
    border-radius: var(--lc-header-radius);
    height: var(--lc-header-height);
    color: white;
    background: rgba(40, 40, 40, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(11.1px);
    -webkit-backdrop-filter: blur(11.1px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all .5s ease;
    padding-left: .5rem;
    padding-right: .5rem;

    &.is-open {
        background: rgba(40, 40, 40, 0);
        border-color: rgba(255, 255, 255, 0);
        backdrop-filter: blur(0);
        -webkit-backdrop-filter: blur(0);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0);
    }

}

.v-app-header__logo-container {
    &:before,
    &:after {
        content: none;
    }
}

.v-app-header__icon {
    display: block;
    height: 1rem;
}

.v-app-header__logo {
    display: block;
    height: 1rem;
    margin: 0 auto;
}

.app-header__icon-menu {
    border: none;
    background: transparent;
    display: flex;
    user-select: none;
    cursor: pointer;
}

.app-header__icon-menu__img {
    display: block;
    height: .65rem;
    width: .65rem;
    object-fit: contain;
}
</style>
