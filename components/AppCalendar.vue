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
                                @click="updateSelectedDate(date)"
                                :date="date"
                                :is-active="selectedDate === date"
                            />
                        </div>
                    <button class="v-app-calendar__nav-button v-app-calendar__nav-button--right">>></button>
                </div>
            </div>

            <div
                v-if="seancesDataOnSelectedDate === null"
                class="v-app-calendar__film-list">
                chargement…
            </div>

            <div class="v-app-calendar__film-list"
                 v-else-if="seancesDataOnSelectedDate?.length < 1"
                style="display: flex; align-items: center; justify-content: center"
            >
                <div>
                    Pas d'évènements pour cette date :)
                </div>
            </div>

            <div
                    v-else
                    class="v-app-calendar__film-list"
            >
                <div class="v-app-calendar__film-list__title"
                >
                    {{selectedDate?.toLocaleString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}}
                </div>
                <div
                    v-for="seanceData of seancesDataOnSelectedDate"
                >
                    <div class="v-app-calendar__film-list__info"
                         v-for="seance of seanceData.seances"
                    >
                        <AppCalendarListItem
                            :title="seance.tx_titre_lng"
                            :cover-url="seanceData.filmCover"
                            :hour="seance.tx_heure"
                        />
                    </div>
                </div>
            </div>
        </template>


    </section>
</template>





<script setup lang="ts">
import {defineProps, type Ref, type UnwrapRef} from 'vue'
import {getDatesRange} from "~/_utils/getDatesRange";
import {
    apiGetListOfFilmByDate, apiGetListOfFilmSeanceByDate,
    fetchFromTicketAPI,
    type IFilmListResponse, type ISeance,
    type ISeancesOfFilm
} from "~/_utils/apiTicket";

const props = defineProps<{
}>()

const selectedDate: Ref<UnwrapRef<Date | null>> = ref(null)

const dateRange: Ref<UnwrapRef<Date[]>> = ref([])

const seancesDataOnSelectedDate: Ref<UnwrapRef<null | {seances: ISeance[], filmCover?: string}[]>> = ref(null)

onMounted(() => {
    setDateRange(new Date())
})

async function setDateRange(date: Date) {
    const dateRage = getDatesRange(date, 7)

    dateRange.value = dateRage

    updateSelectedDate( dateRage[0] )
}

async function updateSelectedDate(date: Date) {
    selectedDate.value = date
    seancesDataOnSelectedDate.value = await apiGetListOfFilmSeanceByDate(date)
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
    padding: .5rem var(--app-gutter_regular);
    background: var(--lc-color--blue-light);
    color: white;
    width: min(100%, 35em);
    min-height: 6rem;

    > * {
        border-bottom: dotted 2px;
    }
}

.v-app-calendar__film-list__title {
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    padding-bottom: .5em;
}

.v-app-calendar__film-list__info {
    text-transform: uppercase;
}
</style>
