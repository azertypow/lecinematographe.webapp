<template>
    <header class="v-app-header app-flex app-flex--row app-flex--justify_space-between app-flex--align_center app-width-gutter"
    >
        <div class="app-flex">
            <img
                class="v-app-header__icon"
                src="../assets/icons/leCinematographe-icon.svg"
                alt="logo cinematographe.ch"
            />
            <img
                class="v-app-header__logo"
                src="../assets/icons/leCinematographe-logo_type.svg"
                alt="logo cinematographe.ch"
            />
        </div>
        <div class="app-flex app-flex--gap_regular">
            <div>accessibilité</div>
            <div>menu</div>
            <div>icon</div>
        </div>
    </header>
</template>





<script lang="ts" setup>

</script>





<style lang="scss" scoped >
.v-app-header {
    border-radius: var(--lc-header-height);
    height: var(--lc-header-height);
    color: black;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(11.1px);
    -webkit-backdrop-filter: blur(11.1px);
    border: 1px solid rgba(255, 255, 255, 0.3);
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
</style>
