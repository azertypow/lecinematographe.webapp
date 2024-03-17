<template>
    <section
        class="v-app-calendar app-flex app-flex--column app-flex--align_center"
    >
        <template v-if="dateRange.length < 1">
            <div>chargement…</div>
        </template>
        <template v-else>
            <div class="v-app-calendar__dates"
            >
                <div class="app-flex app-flex__basis-24-24 app-flex--justify_space-between app-flex--align_flex-start app-flex--nowrap">
                    <button class="v-app-calendar__nav-button v-app-calendar__nav-button--left"><<</button>
                        <div v-for="date of dateRange">
                            <AppCalendarButtonDate
                                @click="selectedDate = date"
                                :date="date"
                                :is-active="selectedDate === date"
                            />
                        </div>
                    <button class="v-app-calendar__nav-button v-app-calendar__nav-button--right">>></button>
                </div>
            </div>

            <div
                v-if="filmsOnSelectedDate === null"
                class="v-app-calendar__film-list">
                chargement…
            </div>

            <div
                v-else
                class="v-app-calendar__film-list"
                v-for="film of filmsOnSelectedDate.filmlist"
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
        </template>


    </section>
</template>





<script setup lang="ts">
import {defineProps, type Ref, type UnwrapRef} from 'vue'
import {getDatesRange} from "~/_utils/getDatesRange";
import {apiGetListOfFilmByDate, type IFilmListResponse} from "~/_utils/apiTicket";

const props = defineProps<{
}>()

const selectedDate: Ref<UnwrapRef<Date | null>> = ref(null)

const dateRange: Ref<UnwrapRef<Date[]>> = ref([])

const filmsOnSelectedDate: Ref<UnwrapRef<null | IFilmListResponse>> = ref(null)

onMounted(() => {
    setDateRange(new Date())
})

async function setDateRange(date: Date) {
    const dateRage = getDatesRange(date, 7)

    dateRange.value = dateRage
    selectedDate.value = dateRage[0]

    filmsOnSelectedDate.value = await apiGetListOfFilmByDate(selectedDate.value)
}

</script>





<style lang="scss" scoped >
.v-app-calendar {
}

.v-app-calendar__nav-button {
    font-size: .85rem;
    letter-spacing: -.2em;
    height: 1rem;

    &.v-app-calendar__nav-button--left {
        padding-left: 0;
    }

    &.v-app-calendar__nav-button--right {
        padding-right: 0;
    }
}

.v-app-calendar__dates {
  width: 100%;
}

.v-app-calendar__film-list {
    box-sizing: border-box;
    border-radius: var(--lc-radius);
    padding: var(--app-gutter_regular);
    background: var(--lc-color--blue-light);
    color: white;
    width: min(100%, 35em);

    > * {
        box-shadow: 0 1px 0 0 white;
    }
}

.v-app-calendar__film-list__title {
    width: 100%;
    text-align: center;
}
</style>
