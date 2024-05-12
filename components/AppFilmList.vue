<template>
    <section class="v-app-film-list">
        <div class="v-app-film-list__title-container"
             v-if="showTitle"
        >
            <h3 class="lc-typo-with-dot" style="margin:0 auto">
                À L’AFFICHE
            </h3>
        </div>
        <div class="v-app-film-list__films-container app-flex app-flex--gap_regular app-flex--nowrap"
        >
            <div class="app-flex__shrink-0 app-flex__basis-1-4 v-app-film-list__films-container__item"
                 v-for="film of ticketFilmArray">
                <AppFilmMin
                    :ticket-film="film"
                />
            </div>
        </div>
    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import type {ITicketFilm} from "~/_utils/apiTicket";

const props = withDefaults(defineProps<{
    ticketFilmArray: ITicketFilm[],
    showTitle: false
}>(), {
})
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
    @media (max-width: scss-params.$fp-breakpoint-sm) {
        flex-basis: calc( 100% / 2 );
    }

    @media (max-width: scss-params.$fp-breakpoint-xs) {
        flex-basis: calc( 100% / 5 * 4 );
    }
}
</style>
