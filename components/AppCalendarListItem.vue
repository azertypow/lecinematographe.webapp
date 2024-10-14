<template>
    <section
        class="v-app-calendar-list-item app__ticket-container-for-hover-effect"
    >
        <div class="v-app-calendar-list-item__container app-flex app-flex--align_center app-flex--gap_large app-flex--nowrap"
             style="position: relative;"
        >
            <nuxt-link
                style="border: none"
                :to="`/film/${seanceId}`"
            >
                <img
                    class="v-app-calendar-list-item__cover"
                    :alt="`image de couverture de ${title}`"
                    :src="cover_url"
                />
            </nuxt-link>
            <nuxt-link class="v-app-calendar-list-item__text app-flex app-flex--justify_space-between app-flex--nowrap app-flex--align_center"
                       :to="`/film/${seanceId}`"
            >
                <h3 class="v-app-calendar-list-item__title"
                >{{ title }}</h3>
                <p class="v-app-calendar-list-item__hour"
                >{{
                        new Date(start_date).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        }).replace(':', 'h')
                    }}</p>
            </nuxt-link>
            <a target="_blank"
               v-if="booking_mode !== 'other'"
               :href="`https://lecinematographe.ticketack.com/screening/buy/${seanceId}`"
            >
                <img class="app__ticket--img"
                     alt="prendre un ticket"
                     src="../assets/icons/ticket.svg"
                />
            </a>
        </div>
    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import type {ApiTicketack_bookingMode} from "~/_utils/apiTicketack";

const props = defineProps<{
    title: string,
    cover_url: string,
    start_date: string,
    seanceId: string,
    enPresenceDe?: string
    booking_mode?: ApiTicketack_bookingMode
}>()
</script>





<style lang="scss" scoped >
.v-app-calendar-list-item {
    padding: .25rem 5px;
    cursor: pointer;
}

.v-app-calendar-list-item__container {
    color: inherit;
    border: none;
    cursor: pointer;
  user-select: none;
}

.v-app-calendar-list-item__cover {
    display: block;
    height: 3.5rem;
    aspect-ratio: 3/2;
    object-fit: cover;

    @media (max-width: 700px) {
        display: none;
    }
}

.v-app-calendar-list-item__text {
    width: 100%;
    color: inherit;
    border: none;

    @media (max-width: 700px) {
        flex-direction: column;
        align-items: flex-start;

        > * {
            margin: 0;
        }
    }
}

.v-app-calendar-list-item__title {
    margin: 0;

    @media (max-width: 700px) {
        font-size: .65rem;
    }
}

.v-app-calendar-list-item__hour {
    @media (max-width: 700px) {
        font-size: .5rem;
        line-height: 1em;
    }
}

.v-app-calendar-list-item__soon {
    position: absolute;
    top: 2.3rem;
    right: -.5em;
    font-size: .4rem;
    line-height: 1.25em;
    transform: rotate(-5deg);

    @media (max-width: 700px) {
        top: calc( 50% + .45rem );
        font-size: .35rem;
    }
}
</style>
