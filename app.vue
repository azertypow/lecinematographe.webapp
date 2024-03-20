<script lang="ts" setup>
import AppNav from "~/components/AppNav.vue";

const menuIsOpen = useMenuIsOpen()

useRouter().beforeEach((to, from) => {
    menuIsOpen.value = false
})
</script>

<template>
    <div class="v-app__header-container app-flex app-flex--nowrap app-flex--justify_center app-flex--sm"
    >
        <div class="app-flex__basis-16-24 app-flex--sm__basis-1-1">
            <AppHeader/>
        </div>
    </div>

    <transition
    >
        <div class="v-app__nav-container app-flex app-flex--nowrap app-flex--justify_center app-flex--sm"
             v-if="useMenuIsOpen().value"
        >
            <div class="app-flex__basis-16-24 app-flex--sm__basis-1-1 v-app__nav-container__grid">
                <AppNav/>
            </div>
        </div>
    </transition>

    <div class="v-app__page-container"
    >
        <NuxtPage/>
    </div>

    <div class="v-app__footer-container app-flex app-flex--justify_center app-width-gutter"
    >
        <AppFooter/>
    </div>
</template>
<style lang="scss">
@use "@/assets/style/scss-params";

.v-app__header-container {
    position: fixed;
    top: .5rem;
    left: 0;
    width: 100%;
    z-index: 1000;
}

.v-app__nav-container {
    position: fixed;
    top: .5rem;
    left: 0;
    width: 100%;
    z-index: 500;
    height: 100%;
}

.v-app__nav-container__grid {
    height: 100%;
}

.v-app__page-container {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: calc( var(--lc-header-height) + 1rem);
}

.v-app__footer-container {
}
</style>
