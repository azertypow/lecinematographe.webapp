<template>
    <section class="v-app-film-details app-flex app-flex--justify_center"
        :style="{
            background: colorBG ? `rgb(${colorBG[0]}, ${colorBG[1]}, ${colorBG[2]})` : 'rgb(0, 0, 0)',
        }"
    >
        <div class="v-app-film-details__background-img"
             :style="{
                backgroundImage: `url(${ticketFilm.ur_cover})`,
            }"
        ></div>
        <h3 class="v-app-film-details__date">{{ ticketFilm.da_depart }}</h3>
        <h1 class="v-app-film-details__title">{{ticketFilm.tx_titre_lng}}</h1>
        <h5 class="v-app-film-details__subtitle">Un film <span class="lc-first-letter-to-lowercase">{{ticketFilm.tx_realisateur}}</span></h5>
        <div class="v-app-film-details__cover">
            <img alt="image de couverture pour le film"
                 :src="ticketFilm.ur_cover"
                 @load="(e) => setGradientColor(e.target)"
            />
        </div>
        <div class="v-app-film-details__details"
             v-html="ticketFilm.tx_comment"
        ></div>

        <div class="v-app-film-details__details"
        >
            <div class="v-app-film-details__details__header app-flex app-flex--align_center app-flex--gap_regular app-flex--nowrap">
                <div class="v-app-film-details__details__header__icon">
                    <img
                        alt="icon séance"
                        src="../assets/icons/seance.svg"
                    />
                </div>
                <h3 class="v-app-film-details__details__header__title">{{ticketFilm.tx_titre_lng}}</h3>
            </div>
            <div>Un film de {{ticketFilm.tx_realisateur}}</div>
            <div class="v-app-film-details__details__info">
                <div class="v-app-film-details__details__info__item">
                    <div>Date (départ)</div>
                    <div>{{ticketFilm.da_depart}}</div>
                </div>
                <div class="v-app-film-details__details__info__item">
                    <div>Pays</div>
                    <div>{{ticketFilm.tx_pays}}</div>
                </div>
                <div class="v-app-film-details__details__info__item">
                    <div>Acteur·ice·x·s</div>
                    <div>{{ticketFilm.tx_acteur}}</div>
                </div>
            </div>
        </div>
        <div class="v-app-film-details__details"
             v-if="nextSeances"
        >
            <div class="v-app-film-details__details__header app-flex app-flex--align_center app-flex--gap_regular app-flex--nowrap">
                <div class="v-app-film-details__details__header__icon">
                    <img
                        alt="icon séance"
                        src="../assets/icons/material-date-range--white.svg"
                    />
                </div>
                <h3 class="v-app-film-details__details__header__title">SÉANCES</h3>
            </div>
            <div class="v-app-film-details__details__info"
            >
                <div class="v-app-film-details__details__info__item"
                     v-for="nextSeance of nextSeances.seance"
                >
                    <div>{{ new Date(`${nextSeance.id_date} ${nextSeance.tx_heure}`).toLocaleDateString('fr-FR', dateOptionsDay) }}</div>
                </div>
            </div>
        </div>
    </section>
</template>





<script setup lang="ts">
import {defineProps, type Ref, type UnwrapRef} from 'vue'
import {
    apiGetSeancesOfFilm,
    apiGetUrlOfFilm,
    type ISeancesOfFilm,
    type ITicketFilm
} from "~/_utils/apiTicket";
import {average} from "color.js";

const props = defineProps<{
    ticketFilm: ITicketFilm
}>()

const nextSeances: Ref<UnwrapRef<null | ISeancesOfFilm>> = ref(null)

const linksOfFilm: Ref<UnwrapRef<null | {url: {id_film: string, ty_url: string, tx_url: string, ur_url: string}[]}>> = ref(null)

const dateOptionsDay: Intl.DateTimeFormatOptions = {
    weekday: 'long', // Jour de la semaine au format long (ex: "lundi")
    day: 'numeric', // Jour du mois au format numérique (ex: 13)
    month: 'long', // Mois au format long (ex: "janvier")
    hour: 'numeric', // Heure au format numérique (ex: 20)
    minute: 'numeric', // Minute au format numérique (ex: 30)
    hour12: false // Format de l'heure en 24 heures (ex: 20h30)
}

onMounted(async () => {
    nextSeances.value = await apiGetSeancesOfFilm(props.ticketFilm.id_film)
    linksOfFilm.value = await apiGetUrlOfFilm(props.ticketFilm.id_film)
})

const colorBG: Ref<UnwrapRef<number[] | null>> = ref(null)

async function setGradientColor(imageElement: HTMLImageElement) {
    colorBG.value = (await average(imageElement, {format: 'array'}) as [])
}

</script>





<style lang="scss" scoped >
.v-app-film-details {
    position: relative;
    background: black;
    border-radius: var(--lc-radius);
    padding: 4em .5em .5em;
    transform: translate3d(0, 0, 0);
    overflow: hidden;
}

.v-app-film-details__background-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: .5;
    mix-blend-mode: multiply;
    filter: blur(50px);
    background-repeat: no-repeat;
    background-size: cover;
    //background-image: url(../assets/background.jpeg);
}

.v-app-film-details__cover {
    img {
        display: block;
        width: 100%;
        border-radius: var(--lc-radius);
    }
}

.v-app-film-details__date {
    position: absolute;
    top: var(--app-flex--gap_half);
    left: var(--app-flex--gap_half);
    margin: 0;
}

.v-app-film-details__title {
    margin: 0;
    flex-basis: calc(100% / 12 * 12);
    font-size: 1.75rem;
    line-height: 1em;

    @container (width < 1000px) {
        font-size: 1.2rem;
        line-height: 1em;
    }
}

.v-app-film-details__subtitle {
    margin: 0;
    margin-bottom: .5rem;
    flex-basis: calc(100% / 12 * 12);
}
.v-app-film-details__details {
    margin: 0;
    flex-basis: calc(100% / 12 * 8);
}

.v-app-film-details__details__header {
    border-bottom: solid 1px white;
    padding-top: 2rem;
    box-sizing: border-box;
    max-width: 30em;
}

.v-app-film-details__details__header__title {
    font-size: 1rem;
    line-height: 1.25em;
    margin: 0;
}

.v-app-film-details__details__info {
    padding-left: 2rem;
    padding-top: .5rem;
    box-sizing: border-box;
    max-width: 30em;
}

.v-app-film-details__details__info__item {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.v-app-film-details__cover {
    display: block;
    flex-basis: calc(100% / 12 * 10);
}

.v-app-film-details__details__header__icon {
    img {
        display: block;
    }
}
</style>
