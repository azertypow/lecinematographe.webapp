<template>
    <section
        class="v-app-calendar"
    >
      <template v-if="calendarIsDisable">
        <div class="v-app-calendar__is-disable-msg">
          <div>Le Cinématographe réouvre le mercredi 28 août 🙂</div>
        </div>
      </template>
      <template v-else>
        <template v-if="dateRange.length < 1">
            <div style="display: flex; align-items: center; justify-content: center">
                <div>chargement…</div>
            </div>
        </template>
        <template v-else>
            <div class="v-app-calendar__layout">
                <div class="v-app-calendar__dates"
                >
                    <div class="v-app-calendar__nav-button app-flex app-flex__basis-24-24 app-flex--justify_space-between app-flex--align_flex-start app-flex--nowrap">
                        <div class="v-app-calendar__nav-button__item"></div>
<!--                        <button class="v-app-calendar__nav-button__item v-app-calendar__nav-button__item&#45;&#45;left"><<</button>-->
                        <div v-for="date of dateRange">
                            <AppCalendarButtonDate
                                @click="updateSelectedDate(date)"
                                :date="date"
                                :is-active="selectedDate === date"
                            />
                        </div>
                        <div class="v-app-calendar__nav-button__item"></div>
<!--                        <button class="v-app-calendar__nav-button__item v-app-calendar__nav-button__item&#45;&#45;right">>></button>-->
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
                        programmation à venir :)
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
                        <div class="v-app-calendar__film-list__info">
                            <AppCalendarListItem
                                :title="seanceData.title.original"
                                :cover_url="seanceData.opaque.posters[0]?.url || ''"
                                :hour="seanceData.start_at"
                                :seance-id="1"
                                :film_id="1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </template>
      </template>

    </section>
</template>





<script setup lang="ts">
import {type Ref, type UnwrapRef} from 'vue'
import {getDatesRange} from "~/_utils/getDatesRange";
import {apiGetListOfFilmByDate, type ISeance,} from "~/_utils/apiTicket";
import type {ApiTicketack_Film} from "~/_utils/apiTicketack";

const selectedDate: Ref<UnwrapRef<Date | null>> = ref(null)

const dateRange: Ref<UnwrapRef<Date[]>> = ref([])

const seancesDataOnSelectedDate: Ref<UnwrapRef<null | ApiTicketack_Film[]>> = ref(null)

const calendarIsDisable = false

onMounted(() => {
    if(calendarIsDisable) return

    setDateRange(new Date())
})

async function setDateRange(date: Date) {
    const dateRage = getDatesRange(date, 7)

    dateRange.value = dateRage

    updateSelectedDate( dateRage[0] )
}

async function updateSelectedDate(date: Date) {
    selectedDate.value = date
    seancesDataOnSelectedDate.value = await apiGetListOfFilmByDate(new Date('2024-10-01'))
}

</script>





<style lang="scss" scoped >

.v-app-calendar {
    container: app-calendar / inline-size;
}

.v-app-calendar__is-disable-msg {
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: var(--lc-radius);
  padding: .5rem var(--app-gutter_regular);
  background: var(--lc-color--blue-light);
  color: white;
  width: min(100%, 35em);
  min-height: 6rem;
}

.v-app-calendar__layout {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;

    @media (max-width: 700px) {
        flex-direction: row;
        gap: .5rem;
        padding-left: .5rem;
        padding-right: .5rem;
    }
}

.v-app-calendar__nav-button {
    @media (max-width: 700px) {
        flex-direction: column;
    }
}

.v-app-calendar__nav-button__item {
    font-size: .85rem;
    letter-spacing: -.2em;
    height: 1rem;
    width: 1rem;

    &.v-app-calendar__nav-button__item--left {
        padding-left: 0;
    }

    &.v-app-calendar__nav-button__item--right {
        padding-right: 0;
    }
}

.v-app-calendar__dates {
  width: 100%;

    @media (max-width: 700px) {
        width: auto;
    }
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
    box-sizing: border-box;
}

.v-app-calendar__film-list__info {
    text-transform: uppercase;
}
</style>
