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
<!--        <h3 class="v-app-film-details__date">À partir du {{ new Date(ticketFilm.da_depart).toLocaleDateString('fr-FR', dateOptionsDayOnly) }}</h3>-->
        <h1 class="v-app-film-details__title">{{ticketFilm.tx_titre_lng}}</h1>
        <h5 class="v-app-film-details__subtitle">Un film <span class="lc-first-letter-to-lowercase">{{ticketFilm.tx_realisateur}}</span></h5>
        <div class="v-app-film-details__cover">

            <div
                v-if="youtubeLink"
                @click="usePlayerLink().value = youtubeLink.ur_url"
            >
                <img class="v-app-film-details__cover__icon-player"
                     alt="lancer le player pour visualiser la bande annonce du film"
                     src="@/assets/icons/play_circle_FILL0_wght400_GRAD0_opsz24.svg"
                />
            </div>

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
            <div class="v-app-film-details__details__header app-flex app-flex--nowrap">
                <div class="v-app-film-details__details__header__icon">
                    <img
                        alt="icon séance"
                        src="../assets/icons/seance.svg"
                    />
                </div>
                <h3 class="v-app-film-details__details__header__title">{{ticketFilm.tx_titre_lng}}</h3>
            </div>
            <div class="v-app-film-details__details__author">Un film {{ticketFilm.tx_realisateur.replace('D', 'd')}}</div>
            <div class="v-app-film-details__details__info">
                <div class="v-app-film-details__details__info__item">
                    <div>Date</div>
                    <div>{{ticketFilm.tx_annee}}</div>
                </div>
                <div class="v-app-film-details__details__info__item">
                    <div>Pays</div>
                    <div>{{ticketFilm.tx_pays}}</div>
                </div>
                <div class="v-app-film-details__details__info__item">
                    <div>Acteur·ice·x·s</div>
                    <div>{{ticketFilm.tx_acteur.replace(/\s*Avec/, '')}}</div>
                </div>
                <div class="v-app-film-details__details__info__item">
                    <div>Titre original</div>
                    <div>{{ticketFilm.tx_titre_lng}}</div>
                </div>
                <div class="v-app-film-details__details__info__item">
                    <div>Réalisateur·ice·x·s</div>
                    <div>{{ticketFilm.tx_realisateur.replace('De', '')}}</div>
                </div>
                <div class="v-app-film-details__details__info__item">
                    <div>Durée</div>
                    <div>{{ticketFilm.tx_duree}}</div>
                </div>
                <div class="v-app-film-details__details__info__item">
                    <div>Age</div>
                    <div>{{ticketFilm.tx_age}}</div>
                </div>
                <div class="v-app-film-details__details__info__item">
                    <div>Distributeur</div>
                    <div>{{ticketFilm.tx_distributeur}}</div>
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
                     v-for="nextSeance of nextSeances"
                >
                    <div>{{ new Date(`${nextSeance.id_date}T${nextSeance.tx_heure}:00`).toLocaleDateString('fr-FR', dateOptionsDayOnly) }}</div>
                    <div>{{ formatDateFromDate( new Date(`${nextSeance.id_date}T${nextSeance.tx_heure}:00`) ) }}</div>
                    <div>
                        <div style="position: absolute; top: 1rem; right: 0; font-size: .5rem; line-height: 1.25em; transform: rotate(-5deg);">bientôt!</div>
                        <img class="v-app-film-details__details__info__item__ticket"
                             alt="prendre un billet" src="../assets/icons/ticket.svg" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>





<script setup lang="ts">
import {defineProps, type Ref, type UnwrapRef} from 'vue'
import {
    apiGetSeancesOfFilm,
    apiGetUrlOfFilm, type ISeance,
    type ISeancesOfFilm,
    type ITicketFilm
} from "~/_utils/apiTicket";
import {average} from "color.js";
import {formatDateFromDate} from "~/_utils/dateFormatHelper";
import {usePlayerLink} from "~/composables/states";

const props = defineProps<{
    ticketFilm: ITicketFilm
}>()

const nextSeances: Ref<UnwrapRef<null | ISeance[]>> = ref(null)

const linksOfFilm: Ref<UnwrapRef<null | {url: {id_film: string, ty_url: string, tx_url: string, ur_url: string}[]}>> = ref(null)

const dateOptionsDay: Intl.DateTimeFormatOptions = {
    weekday: 'long', // Jour de la semaine au format long (ex: "lundi")
    day: 'numeric', // Jour du mois au format numérique (ex: 13)
    month: 'long', // Mois au format long (ex: "janvier")
    hour: 'numeric', // Heure au format numérique (ex: 20)
    minute: 'numeric', // Minute au format numérique (ex: 30)
    hour12: false // Format de l'heure en 24 heures (ex: 20h30)
}

const dateOptionsDayOnly: Intl.DateTimeFormatOptions = {
    weekday: 'long', // Jour de la semaine au format long (ex: "lundi")
    day: 'numeric', // Jour du mois au format numérique (ex: 13)
    month: 'long', // Mois au format long (ex: "janvier")
}

const youtubeLink = computed(() => linksOfFilm.value?.url.find(filmUrl => {
    return filmUrl.ur_url.match('youtube.')
}))

onMounted(async () => {
    nextSeances.value = (await apiGetSeancesOfFilm(props.ticketFilm.id_film)).seance.sort((a, b) => {
        return (new Date(a.id_date).getTime() - new Date(b.id_date).getTime())
    })
    linksOfFilm.value = await apiGetUrlOfFilm(props.ticketFilm.id_film)
})

const colorBG: Ref<UnwrapRef<number[] | null>> = ref(null)

async function setGradientColor(imageElement: HTMLImageElement) {
    colorBG.value = (await average(imageElement, {format: 'array'}) as [])
}

</script>





<style lang="scss" scoped >
@use "@/assets/style/scss-params";

.v-app-film-details {
    position: relative;
    background: black;
    border-radius: var(--lc-radius);
    padding: 4em .5em 4em;
    transform: translate3d(0, 0, 0);
    overflow: hidden;
    box-sizing: border-box;
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
    position: relative;

    img {
        display: block;
        width: 100%;
        border-radius: var(--lc-radius);
    }
}
.v-app-film-details__cover__icon-player {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25%;
    height: 25%;
    transition: transform .5s ease-in-out;
    cursor: pointer;

    &:hover {
        transform: translate(-50%, -50%) scale(1.15);
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
    width: min(100%, var(--lc-max-width--reg));
    font-size: 1.75rem;
    line-height: 1em;

    @container (width < 1000px) {
        font-size: 1.2rem;
        line-height: 1em;
    }
}

.v-app-film-details__subtitle {
    margin: 0 0 .5rem;
    width: min(100%, var(--lc-max-width--reg));
}
.v-app-film-details__details {
    margin: 0;
    width: min(100%, var(--lc-max-width--reg));
}

.v-app-film-details__details__header {
    border-bottom: dotted 2px white;
    border-top: dotted 2px white;
    margin-top: 2rem;
    box-sizing: border-box;
    padding-top: .25em;
    padding-bottom: .25em;
}

.v-app-film-details__details__header__title {
    font-size: 1rem;
    line-height: 1.25em;
    margin: 0;
}

.v-app-film-details__details__author {
    margin-top: .65rem;
    padding-left: 2rem;

    @media (max-width: scss-params.$fp-breakpoint-sm) {
        padding-left: 0;
    }
}

.v-app-film-details__details__info {
    padding-left: 2rem;
    padding-top: .5rem;
    box-sizing: border-box;

    @media (max-width: scss-params.$fp-breakpoint-sm) {
        padding-left: 0;
    }
}

.v-app-film-details__details__info__item {
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    cursor: pointer;

    @media (max-width: scss-params.$fp-breakpoint-sm) {
        grid-template-columns: 1fr;
        line-height: 1.15em;
        margin-bottom: .5rem;
    }
}

.v-app-film-details__cover {
    display: block;
    width: min(100%, var(--lc-max-width--sm));
}

.v-app-film-details__details__header__icon {
    padding-top: .25rem;
    width: 2rem;

    img {
        height: .75rem;
        width: auto;
        display: block;
    }
}

.v-app-film-details__details__info__item {
    position: relative;
    padding-top: .25rem;
    padding-bottom: .25rem;
}

.v-app-film-details__details__info__item__ticket {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    height: 1rem;
    transition: transform cubic-bezier(.666, 0, .333, 1) 2s;
    transform: rotate(0) scale(1);

    .v-app-film-details__details__info__item:hover &{
        transform: rotate3d(1, 0, 1, 45deg) scale(1.25);
        transition: transform cubic-bezier(0, .33, 1, 1) 5s;
    }
}
</style>

<style>
.v-app-film-details__details {
    pre {
        all: unset;
        font-style: oblique;
        padding-left: .5rem;
        border-left: solid 1px;
        display: block;

        + p {
            margin-top: 0;
            font-size: .5rem;
        }
    }
}
</style>
