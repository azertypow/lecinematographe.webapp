<template>
    <header class="v-app-header app-flex app-flex--row app-flex--justify_end app-flex--align_center app-width-gutter"
            :class="{
                'is-open': useMenuIsOpen().value
            }"
    >
        <nuxt-link class="v-app-header__logo-container app-flex app-flex--align_center app-flex--nowrap"
                   href="/"
        >
            <img
                class="v-app-header__icon"
                src="../assets/logo_cinematographe_big_fond_blanc.svg"
                alt="logo cinematographe.ch"
            />
        </nuxt-link>
        <transition name="logo-header">
            <img
                v-if=" !useMenuIsExtended().value"
                class="v-app-header__logo"
                src="../assets/icons/leCinematographe-logo_type--white.svg"
                alt="logo cinematographe.ch"
            />
        </transition>
        <div class="app-flex">
            <button class="app-header__icon-menu app-flex app-flex--gap_large app-flex--align_center"
                @click="menuIsOpen = !menuIsOpen"
            ><span class="app-rm--sm">Menu</span>
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
import {useMenuIsExtended} from "~/composables/states";

const menuIsOpen = useMenuIsOpen()
</script>





<style lang="scss" scoped >
@use "@/assets/style/scss-params";

.v-app-header {
    border-radius: var(--lc-header-radius);
    height: var(--lc-header-height);
    color: white;
    padding-left: .5rem;
    padding-right: .5rem;
}

.v-app-header__logo-container {
    border: none;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
}

.v-app-header__icon {
    display: block;
    height: 1rem;
    transform: scale(3) translate(0, 50%);
}

.v-app-header__logo {
    display: block;
    height: 2rem;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 3rem);
}

.app-header__icon-menu {
    border: none;
    display: flex;
    user-select: none;
    cursor: pointer;
    background: rgba(40, 40, 40, 0.2);
    box-shadow: 0 4px 50px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(11.1px);
    -webkit-backdrop-filter: blur(11.1px);
    transition: all .5s ease;
    border-radius: 2rem;
}

.app-header__icon-menu__img {
    display: block;
    height: .65rem;
    width: .65rem;
    object-fit: contain;
}


// vue transition

.logo-header-enter-active,
.logo-header-leave-active {
    transition: opacity .25s linear, transform .25s linear;
}
.logo-header-enter-from {
    opacity: 0;
    transform: translate(-50%, 3rem);
}

.logo-header-leave-to {
    opacity: 0;
    transform: translate(-50%, 0);
}

</style>
