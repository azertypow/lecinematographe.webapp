<template>
    <section
        class="v-app-film-details app-flex app-flex--justify_center"
    >
        <h3 class="v-app-film-details__date" >DIMANCHE 7 AVRIL 2023</h3>
        <h1 class="v-app-film-details__title" >OUR BODY</h1>
        <h5 class="v-app-film-details__subtitle" >Un film de Claire Simon</h5>
        <div class="v-app-film-details__cover">
            <img style="display: block; width: 100%" src="https://source.unsplash.com/random" />
        </div>
        <div class="v-app-film-details__details" >
            <p>Une adolescente est assise dans le cabinet de consultation d’un médecin, la caméra la filme de dos pour préserver son anonymat. Elle raconte au docteur comment elle est tombée enceinte. Son petit ami l’avait assurée qu’il prendrait ses précautions. Maintenant, elle doit prendre une décision difficile. On ressent son angoisse dans chaque phrase qu’elle prononce. Et le petit ami est introuvable. Ceci est l’une des premières scènes du remarquable documentaire « Notre corps » de Claire Simon. Avec un regard empli de tendresse, la réalisatrice française explore une clinique gynécologique à Paris, capturant des scènes d’accouchements, de diagnostics de cancer, de consultations sur l’endométriose et de thérapie hormonale pour une femme trans plus âgée. Le film qui en découle est d’abord observationnel, puis devient de plus en plus personnel, un film sur ce que cela signifie de vivre dans un corps de femme et un magnifique exemple de la puissance du cinéma documentaire. « Notre corps » rassemble des expériences avec lesquelles on se sent généralement isolé; il met en évidence les structures qui considèrent les problèmes comme individuels; il révèle à quel point les choses dont nous n’osons pas parler ont une dimension sociétale et nécessitent d’être discutées.</p>
        </div>
    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import type {ITicketFilm} from "~/_utils/apiTicket";

const props = defineProps<{
    filmData: ITicketFilm
}>()
</script>





<style lang="scss" scoped >
.v-app-film-details {
    position: relative;
    background: var(--lc-color--pastel--green);
    border-radius: var(--lc-radius);
    padding-top: 4em;
}

.v-app-film-details__date {
    position: absolute;
    top: var(--app-flex--gap_half);
    left: var(--app-flex--gap_half);
    margin: 0;
}

.v-app-film-details__title,
.v-app-film-details__subtitle,
.v-app-film-details__details {
    margin: 0;
    flex-basis: calc(100% / 12 * 8);
}

.v-app-film-details__cover {
    display: block;
    flex-basis: calc(100% / 12 * 10);
}
</style>
