<script lang="ts" setup>
import AppNav from "~/components/AppNav.vue";
import AppIntroAnimation from "~/components/AppIntroAnimation.vue";
import {useBarIsOpen, usePlayerLink} from "~/composables/states";

const menuIsOpen = useMenuIsOpen()

useRouter().beforeEach((to, from) => {
    menuIsOpen.value = false
})

const appIsLoading = ref(true)

onMounted(() => {
    setTimeout( () => appIsLoading.value = false, 1_000)
})

const youtubeEmbedLink = computed(() => {
    const videoID =  'VEJuFDpf7gc'

    return `https://www.youtube.com/embed/${videoID}?autoplay=1&color=white`
})

</script>

<template>
    <main class="v-app">
        <transition>
        <div class="v-app__info-container"
             v-if="useBarIsOpen().value"
        >
            <app-info/>
        </div>
        </transition>
        <transition>
            <div class="v-app__player"
                 v-if="usePlayerLink().value">
                <div class="v-app__player__cache"
                     @click="usePlayerLink().value = null"
                ></div>
                <div class="v-app__player__container"
                >
                    <iframe class="v-app__youtube-player"
                            type="text/html"
                            :src="youtubeEmbedLink"
                            frameborder="0" allowfullscreen
                    />
                </div>
            </div>
        </transition>

        <transition name="app-loader-container-transition">
            <template v-if="appIsLoading">
                <div class="v-app__loader-container">
                    <app-intro-animation/>
                </div>
            </template>
        </transition>
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
    </main>
</template>

<style lang="scss">
@use "@/assets/style/scss-params";


/*
page transition
*/
.page-enter-active,
.page-leave-active {
    transition: all 1s ease-in-out;
}
.page-enter-from,
.page-leave-to {
    filter: grayscale(1);
    opacity: 0;
    transform: translate3d(0, -5vh, 0);
}


/*
regular styles
*/
.v-app__info-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10000;
}


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
    min-height: calc(100vh + 5rem);
}

.v-app__loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100000;
    background: rgba(0, 0, 0, 1);
}

.app-loader-container-transition-leave-active {
    opacity: 1;
    background: rgba(0, 0, 0, 1);
}

.app-loader-container-transition-leave-to {
    opacity: 1;
    background: rgba(0, 0, 0, 0);
    transition: background .5s 1s ease-in;
}

.v-app__footer-container {
}

.v-app__player {
    position: fixed;
    background: rgba(0, 0, 0, 0.9);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    container: app__player / inline-size;
}

.v-app__player__cache {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.v-app__player__container {
    position: relative;
    width: 75%;

    @container app__player (width < 1000px) {
        width: calc( 100% - 1rem);
    }
}

.v-app__youtube-player {
    display: block;
    width: 100%;
    aspect-ratio: 16/9;
}
</style>
