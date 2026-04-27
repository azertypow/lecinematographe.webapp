<script lang="ts" setup>
import AppNav from "~/components/AppNav.vue";
import AppIntroAnimation from "~/components/AppIntroAnimation.vue";
import {useListOfMessageByDates, usePagesData, usePlayerLink} from "~/composables/states";
import {type Api_blocks_content, type IApiCmsPage, KQL_Admin, type KQL_Admin_response} from "~/_utils/apiCms";
import type {Ref} from "vue";

const menuIsOpen = useMenuIsOpen()

useRouter().beforeEach((to, from) => {
    menuIsOpen.value = false
})

const appIsLoading = ref(true)

const scrollToButtonStatus: Ref<'hidde' | 'show'> = ref('show')

onMounted(async () => {
    setTimeout( () => appIsLoading.value = false, 1_000)

    const pages: {
        contenu: string
        slug: string
        title: string
        show_in_nav: 'true' | 'false'
    }[] = (
        await KQL_Admin({
            query: 'site().children',
            select: {
                'title' : true,
                'slug' : true,
                'contenu' : true,
                'show_in_nav' : true,
            }
        })
    ).result

    usePagesData().value = {
        pages: pages.map(page => {
                const pageContent = JSON.parse(page.contenu) as Api_blocks_content[]

                return ({
                    slug: page.slug,
                    title: page.title,
                    subsections: [],
                    show_in_nav: page.show_in_nav
                } satisfies IApiCmsPage)
            }
        )
    }

    window.addEventListener('scroll', () => {
        if(window.scrollY > 250) scrollToButtonStatus.value = 'hidde'
        else scrollToButtonStatus.value = 'show'
    })

  const agendaData =         await KQL_Admin({
    query: 'site().dates_infos.toStructure()',
    select: {
      'date' : true,
      'description' : true,
    }
  })

  const agendaDataResult: {
    [key: number]: {"date": string,
    "description": string
  }} | null | undefined = agendaData.result

  if(agendaDataResult) {
    useListOfMessageByDates().value = Object.values(agendaDataResult)
  }

})


const playerLink = usePlayerLink()

const formatedVideoLink = computed<null | { videoPlatform: "vimeo" | "youtube", src: string }>(
    () => playerLink.value ? videoPlatformUrlFormat(playerLink.value): null
)

function scrollToNewsletter() {
    const newsletter = document.querySelector('#newsletter')
    if( ! newsletter ) return
    const scrollTo = window.scrollY + newsletter.getBoundingClientRect().top - window.innerHeight/2

    window.scrollTo({top: scrollTo, behavior: 'smooth'})
}

</script>

<template>
    <main class="v-app">
      <img src="/images/newsletter_button_computer.svg"
           class="lc-page__button-newsletter"
           alt="image pour scroller jusqu'à la newsletter"
           :class="{ 'lc-page__button-newsletter--hidde': scrollToButtonStatus === 'hidde' }"
           draggable="true"
           @click="scrollToNewsletter"
      />
      <img src="/images/newsletter_button_phone.svg"
           class="lc-page__button-newsletter lc-page__button-newsletter--mobile"
           alt="image pour scroller jusqu'à la newsletter"
           :class="{ 'lc-page__button-newsletter--hidde': scrollToButtonStatus === 'hidde' }"
           draggable="true"
           @click="scrollToNewsletter"
      />

        <transition>
            <div class="v-app__player"
                 v-if="formatedVideoLink"
            >
                <div class="v-app__player__cache"
                     @click="playerLink = null"
                ></div>
                <div class="v-app__player__container"
                >
                    <template v-if="formatedVideoLink.videoPlatform === 'vimeo'">
                        <div style="padding:56.25% 0 0 0;position:relative;">
                            <iframe :src="formatedVideoLink.src"
                                    frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                                    style="position:absolute;top:0;left:0;width:100%;height:100%;"
                                    title="All We Imagine As Light"></iframe>
                        </div>
                    </template>
                    <template v-else-if="formatedVideoLink.videoPlatform === 'youtube'">
                        <iframe class="v-app__youtube-player"
                                type="text/html"
                                :src="formatedVideoLink.src"
                                frameborder="0" allowfullscreen
                        />
                    </template>
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
@use '@/assets/style/typography';


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

.lc-page__button-newsletter {
  display: block;
  position: fixed;
  width: 4rem;
  bottom: 1rem;
  right: 1rem;
  z-index: 100;
  cursor: pointer;
  user-select: none;
  -webkit-user-drag: none;
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;

  &.lc-page__button-newsletter--hidde {
    opacity: 0;
    pointer-events: none;
    transform: rotate(90deg);
  }

  &.lc-page__button-newsletter--mobile {
    display: none;
    width: 3rem;
    bottom: auto;
    top: 3rem;
  }

  @media (max-width: scss-params.$fp-breakpoint-sm) {
    display: none;

    &.lc-page__button-newsletter--mobile {
      display: block;
    }
  }
}


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

.v-app__player {
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
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
    box-sizing: border-box;
    box-shadow: 0 100px 100px -50px rgba(0, 0, 0, 1);

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
