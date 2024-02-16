<template>
    <section
        class="v-app-film-min"
        :style="{
            backgroundImage: ``,
        }"
    >
        <img
            :src="ticketFilm.ur_affiche"
            @load="(e) => setGradientColor(e.target)"
        />
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

    // Créer un élément canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // Définir les dimensions du canvas pour correspondre à celles de l'image
    canvas.width = imageElement.width
    canvas.height = imageElement.height

    // Dessiner l'image sur le canvas
    ctx!.drawImage(imageElement, 0, 0)

    // Obtenir les données de l'image sous forme de imageData
    const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height)

    // imageData contient maintenant les données de l'image
    console.log(imageData)

    console.log(imageElement)
    // const color = await average(imageElement)
    // console.log(color) // [241, 221, 63]
}
</script>





<style lang="scss" scoped >
.v-app-film-min {
    width: 100%;
    aspect-ratio: 454/606;
    background-size: cover;
    text-align: center;
}

.v-app-film-min__cover__text {
    height: 100%;
}
</style>
