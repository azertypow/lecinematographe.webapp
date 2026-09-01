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
                    <div class="v-app-calendar__nav-button app-flex app-flex__basis-24-24 app-flex--justify_space-between app-flex--align_flex-start">
                        <button
                            v-if="canGoPrev"
                            class="v-app-calendar__nav-button__item v-app-film-list__arrow-nav v-app-film-list__arrow-nav--left"
                            @click="goToPrevPage"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 height="24px" viewBox="0 -960 960 960"
                                 width="24px"
                            >
                                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                            </svg>
                        </button>
                        <div class="v-app-calendar__dates-grid">
                            <div v-for="date of visibleDateRange">
                                <AppCalendarButtonDate
                                    @click="updateSelectedDate(date)"
                                    :date="date"
                                    :is-active="selectedDate === date"
                                    :is-coming-soon="isComingSoonDate(date)"
                                />
                            </div>
                        </div>
                        <button
                            v-if="canGoNext"
                            class="v-app-calendar__nav-button__item v-app-film-list__arrow-nav"
                            @click="goToNextPage"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 height="24px" viewBox="0 -960 960 960"
                                 width="24px"
                            >
                                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div
                    v-if="seancesDataOnSelectedDate === null"
                    class="v-app-calendar__film-list">
                    chargement…
                </div>
                <div class="v-app-calendar__film-list"
                     v-else-if="seancesDataOnSelectedDate?.length < 1 && !doesDateMatch(selectedDate,listOfMessageByDates.map(item => item.date))"
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

                  <template
                         v-for="msgItem of listOfMessageByDates"
                  >
                    <div class="v-app-calendar__film-list__note"
                         v-if='selectedDate
                                && doesDateMatch(selectedDate, [msgItem.date])'
                         v-html="msgItem.description"
                    />

                  </template>

                    <div
                        v-for="seanceData of seancesDataOnSelectedDate"
                    >
                        <div class="v-app-calendar__film-list__info">
                            <AppCalendarListItem
                                :title="seanceData.title.original"
                                :cover_url="seanceData.films[0].opaque.posters.find(value => value.type === 'banner')?.url || seanceData.films[0].opaque.posters[0]?.url || ''"
                                :start_date="seanceData.start_at"
                                :seance-id="seanceData._id"
                                :booking_mode="seanceData.opaque.booking_mode"
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
import {apiGetListOfFilmByDate} from "~/_utils/apiTicket";
import type {ApiTicketack_screening} from "~/_utils/apiTicketack";
import {doesDateMatch} from "~/_utils/doesDateMatch";

const selectedDate = ref<Date>(new Date())

const dateRange: Ref<UnwrapRef<Date[]>> = ref([])
const pageIndex = ref(0)
const comingSoonDateKeys = ref<Set<string>>(new Set())

const PAGE_SIZE = 10
const MAX_GROUPS = 3

const seancesDataOnSelectedDate: Ref<UnwrapRef<null | ApiTicketack_screening[]>> = ref(null)

const listOfMessageByDates = useListOfMessageByDates()

const calendarIsDisable = false
const visibleDateRange = computed(() => {
    const start = pageIndex.value * PAGE_SIZE
    const end = start + PAGE_SIZE
    return dateRange.value.slice(start, end)
})
const canGoPrev = computed(() => pageIndex.value > 0)
const canGoNext = computed(() => pageIndex.value < MAX_GROUPS - 1)

onMounted(() => {
    if(calendarIsDisable) return

    setDateRange(new Date())
})

watch(listOfMessageByDates, () => preloadComingSoonDates(dateRange.value))


async function setDateRange(date: Date) {
    const dateRage = getDatesRange(date, PAGE_SIZE * MAX_GROUPS)

    dateRange.value = dateRage
    pageIndex.value = 0
    await preloadComingSoonDates(dateRage)

    await updateSelectedDate(dateRage[0])
}

async function goToNextPage() {
    if(!canGoNext.value) return

    pageIndex.value += 1
    updateSelectedDate(visibleDateRange.value[0])
}

async function goToPrevPage() {
    if(!canGoPrev.value) return

    pageIndex.value -= 1
    updateSelectedDate(visibleDateRange.value[0])
}

async function updateSelectedDate(date: Date) {
    selectedDate.value = date
    seancesDataOnSelectedDate.value = await apiGetListOfFilmByDate(new Date(date.toISOString().split('T')[0]))
}

function isComingSoonDate(date: Date) {
    return comingSoonDateKeys.value.has(getDateKey(date))
}

function getDateKey(date: Date) {
    return date.toISOString().split('T')[0]
}

async function preloadComingSoonDates(dates: Date[]) {
    const messageDates = listOfMessageByDates.value.map(item => item.date)

    const checks = await Promise.all(
        dates.map(async (date) => {
            if (doesDateMatch(date, messageDates)) return null

            const dateKey = getDateKey(date)
            const data = await apiGetListOfFilmByDate(new Date(dateKey))
            return data.length < 1 ? dateKey : null
        })
    )

    comingSoonDateKeys.value = new Set(checks.filter((key): key is string => key !== null))
}
</script>





<style lang="scss" scoped >

.v-app-calendar {
    container: app-calendar / inline-size;
    padding: var(--app-gutter_regular);
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

    @media (max-width: 800px) {
        flex-direction: column;
        gap: .4rem;
        padding-left: .5rem;
        padding-right: .5rem;
    }
}

.v-app-calendar__nav-button {
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    justify-content: space-between;

    @media (max-width: 800px) {
        align-items: flex-start;
    }
}

.v-app-calendar__nav-button__item {
    border: none;
    padding: 0;
}

.v-app-calendar__dates,
.v-app-calendar-date {
  width: min(100%, 35em);
    max-width: 35em;

    @media (max-width: 800px) {
        width: min(100%, 35em);
    }
}

.v-app-calendar__dates-grid {
    display: flex;
    flex-wrap: nowrap;
    width: auto;
    gap: 0.4rem;
    justify-content: space-between;
    flex-shrink: 0;

    > div {
        flex: 1 1 0;
        display: flex;
        justify-content: center;
        min-width: 0;
    }

    @media (max-width: 660px) {
        flex-wrap: wrap;
        justify-content: center;
        max-width: 7.8rem;
        gap: 0.2rem;

        > div {
            flex: 0 0 auto;
        }
    }

    @media (max-width: 390px) {
        display: grid;
        grid-template-columns: repeat(5, max-content);
        justify-content: center;
        width: auto;
        max-width: calc((5 * 1.2rem) + (4 * 0.2rem));
        gap: 0.2rem;

        > div {
            display: flex;
            justify-content: center;
        }
    }
}

.v-app-calendar__dates-grid :deep(.v-app-calendar-button-date__button) {
    width: 50px;
    height: auto;
    aspect-ratio: 1 / 1;

    @media (max-width: 800px) {
        width: 40px;
    }

    @media (max-width: 400px) {
        width: 35px;
    }
}

.v-app-film-list__arrow-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 100%;
  width:  50px;
  height: 50px;
  box-shadow: none;
  cursor: pointer;
  flex-shrink: 0;

  svg {
    display: block;
    width: 1.1em;
    height: auto;
    fill: black;
  }

  @media (max-width: 800px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 400px) {
    width: 35px;
    height: 35px;
  }
}

.v-app-film-list__arrow-nav--left {
    transform: rotate(180deg);
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

:global(.v-app-calendar__film-list__note > a) {
  border-bottom: none;
}

:global(.v-app-calendar__film-list__note > a:after) {
  content: ' 🔗';
  font-size: .8em;
}



.v-app-calendar__film-list__title {
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    padding-bottom: .5em;
    box-sizing: border-box;
}

.v-app-calendar__film-list__note {
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-align: center;
}

.v-app-calendar__film-list__info {
    text-transform: uppercase;
}
</style>
