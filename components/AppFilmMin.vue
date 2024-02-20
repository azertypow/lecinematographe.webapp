<template>
    <section
        class="v-app-film-min"
        :style="{
            backgroundImage: ``,
        }"
    >
        <div class="v-app-film-min__cover__text app-flex app-flex--column app-flex--justify_space-between">
            <div
                style="background: linear-gradient(to bottom, var(--lc-color--orange), #ffffff00)"
            >
                <h1 class="v-app-film-min__title"
                >{{ticketFilm.tx_titre_ori}}</h1>
            </div>

            <div style="background: linear-gradient(to top, var(--lc-color--orange), #ffffff00)">
                <p>un film de {{ticketFilm.tx_realisateur}}</p>
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
import { defineProps } from 'vue'
import type {ITicketFilm} from "~/_utils/apiTicket";
import {average} from 'color.js'

const props = defineProps<{
    ticketFilm: ITicketFilm
}>()

async function setGradientColor(imageElement: HTMLImageElement) {
    console.log(imageElement)
    // const color = await average(imageElement)
    // console.log(color) // [241, 221, 63]
}
</script>





<style lang="scss" scoped >
.v-app-film-min {
    width: 100%;
    aspect-ratio: 454/606;
    text-align: center;
    position: relative;
}

.v-app-film-min__cover__text {
    height: 100%;
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
