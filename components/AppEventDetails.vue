<template>
    <section
        class="v-app-event-details app-flex app-flex--justify_center"
    >
        <h3 class="v-app-event-details__date">DU 4 AVRIL AU 11 AVRIL 2024</h3>
        <h1 class="v-app-event-details__title">OUVERTURE!</h1>
        <div class="v-app-event-details__cover">
            <img class="v-app-event-details__cover__img"
                 src="/image_ouverture_cinematographe.jpeg"
                 alt="image couverture évènement"
            />
        </div>

        <div class="v-app-event-details__details">
            <div>
                <p>Au sein des vastes horizons de la cinématographie, la nuit n’est pas simplement une toile de fond, mais une protagoniste à part entière, offrant des nuances inexplorées de mystère, de mélancolie et de métamorphose. Ce cycle de cinéma, intitulé « La Nuit à l’Écran », propose une exploration riche et pluridimensionnelle des représentations nocturnes à travers l’histoire du cinéma. La nuit, avec sa capacité à brouiller les frontières entre réalité et imaginaire, offre aux cinéastes un espace unique de créativité. Elle est le reflet de nos peurs les plus profondes, de nos désirs inavoués et de ces moments d’introspection que le tumulte diurne ne permet pas. À travers une sélection rigoureuse de films, ce cycle invite les spectateurs à plonger dans des univers où la nuit révèle, cache, transforme et dévoile.</p>
            </div>
            <button>plus d'info</button>
        </div>

    </section>
</template>





<script setup lang="ts">
import {defineProps} from 'vue'
import type {ITicketFilm} from "~/_utils/apiTicket";
//1.618
// const props = defineProps<{
// }>()

const imageURL = 'https://source.unsplash.com/random'

</script>





<style lang="scss" scoped >
img {
    display: block;
    width: 100%;
    border-radius: var(--lc-radius);
}

.v-app-event-details {
    position: relative;
    background: var(--lc-color--blue-light);
    border-radius: var(--lc-radius);
    padding-top: 4em;
}

.v-app-event-details__date {
    position: absolute;
    top: var(--app-flex--gap_half);
    left: var(--app-flex--gap_half);
    margin: 0;
}

.v-app-event-details__title,
.v-app-event-details__details {
    margin: 0;
    flex-basis: calc(100% / 12 * 10);
}

.v-app-event-details__cover {
    flex-basis: calc(100% / 12 * 10);
}

.v-app-event-details__cover__img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
}

</style>
