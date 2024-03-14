<template>
    <section
        class="v-app-film-min"
        :style="{
            backgroundImage: ``,
        }"
    >
        <div class="v-app-film-min__cover__text app-flex app-flex--column app-flex--justify_space-between">

            <div :style="`background: linear-gradient(to bottom, rgba(${colorBG[0]}, ${colorBG[1]}, ${colorBG[2]}, 1) 0%, rgba(${colorBG[0]}, ${colorBG[1]}, ${colorBG[2]}, 0) 100%)`"
            >
                <h1 class="v-app-film-min__title"
                >{{ticketFilm.tx_titre_ori}}</h1>
            </div>

            <div :style="`background: linear-gradient(to top, rgba(${colorBG[0]}, ${colorBG[1]}, ${colorBG[2]}, 1) 0%, rgba(${colorBG[0]}, ${colorBG[1]}, ${colorBG[2]}, 0) 100%)`"
            >
                <p class="v-app-film-min__description"
                >un film de {{ticketFilm.tx_realisateur}}</p>
            </div>
            <img class="v-app-film-min__cover__img"
                :alt="`image de couverture de ${ticketFilm.tx_titre_ori}`"
                :src="ticketFilm.ur_affiche"
                @load="(e) => setGradientColor(e.target)"
            />

        </div>
    </section>
</template>





<script setup lang="ts">
import {defineProps} from 'vue'
import type {ITicketFilm} from "~/_utils/apiTicket";
import {average} from 'color.js'

const props = defineProps<{
    ticketFilm: ITicketFilm
}>()

const colorBG = ref([0, 0, 0])

async function setGradientColor(imageElement: HTMLImageElement) {
    colorBG.value = (await average(imageElement, {format: 'array'}) as [])
}
</script>





<style lang="scss" scoped >
.v-app-film-min {
    width: 100%;
    aspect-ratio: 454/606;
    text-align: center;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
}

.v-app-film-min__cover__text {
    height: 100%;
}

.v-app-film-min__title {
    padding-top: .5rem;
    padding-bottom: 3rem;
    margin: 0;
    text-transform: uppercase;
}

.v-app-film-min__description {
    padding-top: 3rem;
    padding-bottom: .5rem;
    margin: 0;
}

.v-app-film-min__cover__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
}
</style>
