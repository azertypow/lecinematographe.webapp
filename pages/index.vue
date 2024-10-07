<template>
    <div class="lc-page"
    >
        <div v-if="data === null"
             class="app-flex app-flex--justify_center app-flex--align_center"
        >
            <h2
            >loading…
            </h2>
        </div>
        <div v-else-if="data.error"
             class="app-flex app-flex--justify_center app-flex--align_center"
        >
            <h2
            >error: {{data.error}}
            </h2>
        </div>
        <div v-else
        >
            <div class="app-grid--column-24 app-flex--sm app-flex--sm--column">
                <div class="v-index__section v-index__section--today app-flex--sm__basis-1-1"
                     v-if="data.filmlist"
                >
                    <AppFilmList
                        :ticket-film-array="data.filmlist"
                        :show-title="true"
                    />
                </div>
                <div class="v-index__section v-index__section--button-agenda app-flex--sm__basis-1-1">
<!--                    <button-->
<!--                        class="app-flex__shrink-0 lc-button&#45;&#45;is-negative lc-button&#45;&#45;is-rounded"-->
<!--                    ><img alt="image agenda" style="height: .75rem; width: .75rem" src="../assets/icons/material-date-range.svg"></button>-->
                </div>
                <div class="v-index__section v-index__section--calendar app-flex--sm__basis-1-1">
                    <AppCalendar/>
                </div>

                <div class="v-index__section v-index__section--fil-vignette app-flex app-grid--column-2 app-grid--sm--column-1 app-grid--gap_regular app-flex--sm__basis-1-1">
                    <div v-for="filmVignette of specialEventsInFilmList">
                        <AppFilmVignette
                            :da_depart="filmVignette.start_at"
                            :tx_description="filmVignette.description.fr"
                            :tx_titre_lng="filmVignette.films[0].title.original"
                            :ur_vignette="filmVignette.films[0].opaque.posters.find(value => value.type === 'banner')?.url || filmVignette.films[0].opaque.posters[0].url"
                            :film_id="10"
                        />
                    </div>
                </div>

                <div class="v-index__section v-index__section--film-details app-flex app-flex--column app-flex app-flex--gap_regular">
                    <div v-if="dateFilmByDate === null" >chargement…</div>
                    <div v-else
                        v-for="filmData of dateFilmByDate">
                        <AppFilmDetails
                            :ticket-film="filmData"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type {ComputedRef, Ref, UnwrapRef} from "vue";
import {
    apiGetListOfFilmByDate,
    apiGetSeancesOfFilm,
    apiGetFilmList,
    type IFilmListResponse,
    apiGetUrlOfFilm, type ITicketFilm, type ISeance, apiGetListOfScreeningByDate_filterByTag_event
} from "~/_utils/apiTicket";
import type {ApiTicketack_screening} from "~/_utils/apiTicketack";

const data: Ref<UnwrapRef<null | IFilmListResponse>> = ref(null)
const dateFilmByDate: Ref<UnwrapRef<null | ApiTicketack_screening[]>> = ref(null)
const specialEventsInFilmList: Ref<UnwrapRef<ApiTicketack_screening[] | null>> = ref(null)

onMounted(async () => {
    apiGetFilmList().then(async value => {
        data.value = value
        specialEventsInFilmList.value = await apiGetListOfScreeningByDate_filterByTag_event(new Date(), 30)
    })

    const currentDateFrom0Houre = new Date()
    currentDateFrom0Houre.setHours(0)
    currentDateFrom0Houre.setMinutes(0)
    apiGetListOfFilmByDate( currentDateFrom0Houre ).then(value => dateFilmByDate.value = value)
})

interface ISpecialEventsInFilmList {
    seance: ISeance
    filmData: ITicketFilm
}

async function loadSpecialEventsInFilmList(): Promise<ISpecialEventsInFilmList[]> {
    if(data.value === null) return []
    if(!data.value.filmlist) return []

    const toReturn: {
        seance: ISeance,
        filmData: ITicketFilm,
    }[] = []

    for (const filmData of data.value.filmlist) {
        const filmEvent = await apiGetSeancesOfFilm(filmData.id_film)
        filmEvent.seance.forEach(seance => {
            if( seance.tx_seance.length < 1 ) return
            toReturn.push({
                seance: seance,
                filmData: filmData,
            })
        })
    }

    return toReturn
}

</script>

<style lang="scss" scoped >

@use "@/assets/style/scss-params";

.v-index__section--fil-vignette {
    padding: var(--app-gutter_regular);
    width: min(100%, var(--lc-max-width--lg));
    margin: auto;
    box-sizing: border-box;
}

.v-index__section {
  grid-column: 1 / span 24;
}

.v-index__section--button-agenda {
    grid-column: 3 / span 2;
    justify-self: center;

    @media (max-width: scss-params.$fp-breakpoint-sm) {
        display: none;
    }
}

.v-index__section--calendar {
  grid-column: 5 / span 16;
}

.v-index__section--fil-event {
    width: min(var(--lc-max-width--lg), 100%);
    margin-left: auto;
    margin-right: auto;
}

.v-index__section--film-details {
    width: min(var(--lc-max-width--lg), 100%);
    margin-left: auto;
    margin-right: auto;
}
</style>
