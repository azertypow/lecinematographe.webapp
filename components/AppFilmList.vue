<template>
  <section class="v-app-film-list">
    <div class="v-app-film-list__title-container"
         v-if="showTitle"
    >
      <h3 class="lc-typo-with-dot" style="margin:0 auto">
        À L’AFFICHE
      </h3>
    </div>

    <div class="v-app-film-list__arrow-nav"
         v-if="showArrowUI"
    >
      <svg xmlns="http://www.w3.org/2000/svg"
           height="24px" viewBox="0 -960 960 960"
           width="24px"
      >
        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
      </svg>
    </div>
    <div class="v-app-film-list__films-container app-flex app-flex--gap_regular app-flex--nowrap"
         @scroll="containerIsScroller"
    >
      <div class="app-flex__shrink-0 app-flex__basis-1-4 v-app-film-list__films-container__item"
           v-for="film of ticketFilmArray">
        <div  style="
                text-align: center;
                padding-bottom: .5em;
                line-height: 1em;
                overflow: hidden;
                position: relative;
              "
        >
          <div  style="
                  width: 100%;
                  box-sizing: border-box;
                  padding: 0 .5rem;
                ">{{film.title.original}}</div>
          <div  style="
                  z-index: 10;
                  position: absolute;
                  right: 0;
                  top: 0;
                  height: 100%;
                  width: 1rem;
                  background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 80%);
                "></div>
        </div>
        <AppFilmMin
                :ticket-film="film"
        />
      </div>
      <div  class="app-flex__shrink-0 v-app-film-list__films-container__item"
            style="
              width:      5vw!important;
              flex-basis: 5vw!important;
            "
      ></div>
    </div>
  </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import type {ApiTicketack_screening} from "~/_utils/apiTicketack";

const props = withDefaults(defineProps<{
    ticketFilmArray: ApiTicketack_screening[],
    showTitle: boolean
}>(), {})

const containerScrollLeftValue = ref(0)

const showArrowUI: ComputedRef<boolean> = computed(() =>
    window.innerWidth > containerScrollLeftValue.value
)

function containerIsScroller(element: Event) {
    const scrollContainer = element.target

    if( ! (scrollContainer instanceof HTMLElement) ) {
        console.error('scrollContainer is not an HTMLElement')
        return
    }

    containerScrollLeftValue.value = scrollContainer.scrollLeft
}
</script>





<style lang="scss" scoped >
@use "@/assets/style/scss-params";

.v-app-film-list {
    width: 100%;
    overflow: hidden;
    position: relative;

    &:before {
        z-index: 10;
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top:0;
        width: var(--app-gutter_regular);
        height: 100%;
        background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    }

    &:after {
        z-index: 10;
        content: "";
        display: block;
        position: absolute;
        right: 0;
        top:0;
        width: var(--app-gutter_regular);
        height: 100%;
        background: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    }
}

.v-app-film-list__title-container {
    width: auto;
    background: linear-gradient(to right, black, #00000000);
    height: 100%;
    pointer-events: none;
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.v-app-film-list__films-container {
    width: 100%;
    overflow: auto;
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: relative;
    padding-left: var(--app-gutter_regular);
    box-sizing: border-box;

}

.v-app-film-list__films-container__item {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-transform: uppercase;

    @media (max-width: scss-params.$fp-breakpoint-sm) {
        flex-basis: calc( 100% / 2 );
    }

    @media (max-width: scss-params.$fp-breakpoint-xs) {
        flex-basis: calc( 100% / 5 * 4 );
    }
}

.v-app-film-list__arrow-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: var(--app-gutter_regular);
  top: 50%;
  z-index: 10;
  background: black;
  border-radius: 1rem;
  width:  1.25rem;
  height: 1.25rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 1);

  svg {
    display: block;
    width: .75rem;
    height: auto;
    fill: white;
  }
}
</style>
