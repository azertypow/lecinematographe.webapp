<template>
    <section
        class="v-app-film-vignette app-flex app-flex--justify_center app__ticket-container-for-hover-effect"
        :style="{background: colorBG ? `rgb(${colorBG[0]}, ${colorBG[1]}, ${colorBG[2]})` : 'rgb(0, 0, 0)'}"
    >
<!--        {{ticketFilm}}-->
        <h3 class="v-app-film-vignette__date">
          ÉVÈNEMENT SPÉCIAL
          <br>{{
            new Date(da_depart).toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })
                  + ', ' +
            new Date(da_depart).toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }).replace(':', 'h')
          }}
        </h3>
        <h1 class="v-app-film-vignette__title">{{tx_titre_lng}}</h1>
        <h5 class="v-app-film-vignette__subtitle" v-html="tx_description"></h5>
        <div class="v-app-film-vignette__cover">
            <img alt="image de couverture pour le film"
                 :src="ur_vignette"
                 @load="(e) => setGradientColor(e.target)"
            />
        </div>
        <div class="v-app-film-vignette__details">
            <nuxt-link
               :href="`/film/${film_id}`"
            >
                <app-button-shine>détails</app-button-shine>
            </nuxt-link>
            <a target="_blank"
               style="display: flex; align-items: center;"
               :href="`https://lecinematographe.ticketack.com/screening/buy/${film_id}`"
               v-if="booking_mode !== 'other' && booking_mode !== 'free'"
            >
                <app-button-shine>réserver</app-button-shine>
                <img class="app__ticket--img"
                     style="height: .75rem"
                     alt="prendre un ticket"
                     src="../assets/icons/ticket.svg"
                />
            </a>
        </div>
    </section>
</template>





<script setup lang="ts">
import {defineProps, type Ref, type UnwrapRef} from 'vue'
import {average} from "color.js";
import {proxyUrl} from "~/_utils/proxyUrl";
import type {ApiTicketack_bookingMode} from "~/_utils/apiTicketack";

const props = defineProps<{
    da_depart: string
    tx_titre_lng: string
    tx_description: string
    ur_vignette: string
    film_id: string
    booking_mode?: ApiTicketack_bookingMode
}>()

const colorBG: Ref<UnwrapRef<number[] | null>> = ref(null)

async function setGradientColor(targetElement: EventTarget | null) {

    if( !(targetElement instanceof HTMLImageElement)) return

    const url = proxyUrl(targetElement.src)

    colorBG.value = (await average(url, {format: 'array'}) as [])
}

</script>





<style lang="scss" scoped >
.v-app-film-vignette__cover {
    img {
        display: block;
        width: 100%;
        border-radius: var(--lc-radius);
    }
}

.v-app-film-vignette {
    position: relative;
    background: black;
    border-radius: var(--lc-radius);
    padding: 4em .5em .5em;
    container: app-film-vignette-container;
    container-type: inline-size;
}

:global(.v-app-film-vignette a) {
  color: var(--lc-color--pastel--blue);
}

.v-app-film-vignette__date {
    position: absolute;
    top: var(--app-flex--gap_half);
    left: var(--app-flex--gap_half);
    margin: 0;

    @container (width < 1000px) {
        font-size: .6rem;
        line-height: 1em;
    }
}

.v-app-film-vignette__title {
    margin: 0;
    flex-basis: calc(100% / 12 * 12);
    font-size: 1.75rem;
    line-height: 1em;

    @container (width < 1000px) {
        font-size: .7rem;
        line-height: 1em;
    }
}

.v-app-film-vignette__subtitle {
    margin: var(--app-flex--gap_half) 0;
    flex-basis: calc(100% / 12 * 12);
    color: inherit;
    border: none;

}

.v-app-film-vignette__details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-top: 1rem;

    a {
        border: none;
    }
}

:global( .v-app-film-vignette__subtitle > * ),
:global( .v-app-film-vignette__details > * ) {
  margin: 0;
}

.v-app-film-vignette__details__header {
    border-bottom: solid 1px white;
    padding-top: 2rem;
}

.v-app-film-vignette__details__header__title {
    font-size: 1rem;
    line-height: 1.25em;
    margin: 0;

}

.v-app-film-vignette__details__info {
    padding-left: 2rem;
    padding-top: .5rem;
}

.v-app-film-vignette__details__info__item {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.v-app-film-vignette__cover {
    display: block;
    flex-basis: calc(100% / 12 * 12);
}

.v-app-film-vignette__details__header__icon {
    img {
        display: block;
    }
}
</style>
