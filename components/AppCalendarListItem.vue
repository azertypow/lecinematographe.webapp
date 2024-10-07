<template>
    <section
        class="v-app-calendar-list-item"
    >
        <nuxt-link class="v-app-calendar-list-item__container app-flex app-flex--align_center app-flex--gap_large app-flex--nowrap"
                   style="position: relative;"
                   :to="`/film/${film_id}`"
        >
            <img
                class="v-app-calendar-list-item__cover"
                :alt="`image de couverture de ${title}`"
                :src="cover_url"
            />
            <div class="v-app-calendar-list-item__text app-flex app-flex--justify_space-between app-flex--nowrap app-flex--align_center">
                <h3 class="v-app-calendar-list-item__title"
                >{{title}}</h3>
                <p class="v-app-calendar-list-item__hour"
                >{{
                    new Date(start_date).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    }).replace(':', 'h')
                  }}</p>
            </div>
            <div style="position: relative">
              <div style="position: absolute; text-align: center; top: 1.15rem; left: 50%; font-size: .4rem; line-height: 1.25em; transform: rotate(-5deg) translate(-50%);">en<br>maintenance</div>
              <img class="v-app-calendar-list-item__ticket"
                   alt="prendre un ticket"
                  src="../assets/icons/ticket.svg"
              />
            </div>
        </nuxt-link>
    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import type {ITicketFilm} from "~/_utils/apiTicket";
import {formatDateFromDate} from "~/_utils/dateFormatHelper";

const props = defineProps<{
    title: string,
    cover_url: string,
    start_date: string,
    seanceId: string,
    enPresenceDe?: string
    film_id: number
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

    @media (max-width: 700px) {
        flex-direction: column;
        align-items: flex-start;

        > * {
            margin: 0;
        }
    }
}

.v-app-calendar-list-item__ticket {
    height: 1rem;
    transition: transform cubic-bezier(.666, 0, .333, 1) 2s;
    transform: rotate(0) scale(1);

    .v-app-calendar-list-item:hover & {
        transform: rotate3d(1, 0, 1, 360deg) scale(1.25);
        transition: transform cubic-bezier(0, 0, .333, 1) 1s;
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
