<template>
    <section
        class="v-app-calendar app-flex app-flex--column app-flex--align_center"
    >
        <div class="app-flex app-flex--justify_space-between app-flex--nowrap app-flex--gap_regular">

            <button
                class="app-flex__shrink-0 lc-button--is-negative lc-button--is-rounded"
            ><img alt="image agenda" src="../assets/icons/material-date-range.svg"></button>

            <div class="app-flex app-flex--gap_large app-flex__basis-24-24 app-flex--justify_space-between">
                <button style="font-size: .85rem; letter-spacing: -.2em"><<</button>
                    <div v-for="date of dateRange">
                        <AppCalendarButtonDate
                            @click="selectedDate = date"
                            :date="date"
                        />
                    </div>
                <button style="font-size: .85rem; letter-spacing: -.2em">>></button>
            </div>
        </div>

        <div
            class="v-app-calendar__film-list"
        >
            <div
                class="v-app-calendar__film-list__title"
            >
                {{selectedDate.toLocaleString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })}}
            </div>
            <div>
                <AppCalendarListItem
                    title="titre de film"
                    en-presence-de="Nathalie Germ"
                    cover-url="https://source.unsplash.com/random"
                    hour="10:30"
                />
            </div>
            <div>
                <AppCalendarListItem
                    title="autre film tres long pour voir comment ceci s'affiche sur la grille"
                    en-presence-de="Marc Dujeans"
                    cover-url="https://source.unsplash.com/random"
                    hour="15:00"
                />
            </div>
        </div>

    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import {getDatesRange} from "~/_utils/getDatesRange";

const props = defineProps<{
    message?: string
}>()

const selectedDate = ref(new Date())

const dateRange = ref(getDatesRange(selectedDate.value, 7))

</script>





<style lang="scss" scoped >
.v-app-calendar {
}

.v-app-calendar__film-list {
    box-sizing: border-box;
    border-radius: var(--lc-radius);
    padding: var(--app-gutter_regular);
    background: var(--lc-color--blue-light);
    color: white;
    width: min(20rem, 100%);

    > * {
        box-shadow: 0 1px 0 0 white;
    }
}

.v-app-calendar__film-list__title {
    width: 100%;
    text-align: center;
}
</style>
