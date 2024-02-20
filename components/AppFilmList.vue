<template>
    <section class="v-app-film-list">
        <div class="v-app-film-list__title-container"
        >
            <h3>
                À L’AFFICHE Aujourdhui
            </h3>
        </div>
        <div class="v-app-film-list__films-container app-flex app-flex--gap_regular app-flex--nowrap"
        >
            <div class="app-flex__shrink-0 app-flex__basis-1-4"></div>
            <div class="app-flex__shrink-0 app-flex__basis-1-4"
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

const props = defineProps<{
    ticketFilmArray: ITicketFilm[]
}>()
</script>





<style lang="scss" scoped >
.v-app-film-list {
    width: 100%;
    overflow: hidden;
    position: relative;
}

.v-app-film-list__title-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 25%;
    background: linear-gradient(to right, black, #00000000);
    height: 100%;
    pointer-events: none;
}

.v-app-film-list__films-container {
    width: 100%;
    overflow: auto;
}
</style>
