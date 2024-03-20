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
                <div class="v-index__section v-index__section--today app-flex--sm__basis-1-1">
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
                            :da_depart="filmVignette.seance.tx_date"
                            :tx_description="filmVignette.seance.tx_seance"
                            :tx_titre_lng="filmVignette.filmData.tx_titre_lng"
                            :ur_vignette="filmVignette.filmData.ur_vignette"
                            :film-id="filmVignette.filmData.id_film"
                        />
                    </div>
                </div>

                <div class="v-index__section v-index__section--fil-event app-flex app-grid--column-1 app-grid--gap_regular">
                    <AppEventDetails/>
                </div>

                <div class="v-index__section v-index__section--film-details app-flex app-flex--column app-flex app-flex--gap_regular">
                    <div v-if="dateFilmByDate === null" >chargement…</div>
                    <div v-else
                        v-for="filmData of dateFilmByDate.filmlist">
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
    apiGetUrlOfFilm, type ITicketFilm, type ISeance
} from "~/_utils/apiTicket";

const data: Ref<UnwrapRef<null | IFilmListResponse>> = ref(null)
const dateFilmByDate: Ref<UnwrapRef<null | IFilmListResponse>> = ref(null)
const specialEventsInFilmList: Ref<UnwrapRef<ISpecialEventsInFilmList[] | null>> = ref(null)

onMounted(async () => {
    apiGetFilmList().then(value => data.value = value)
    apiGetListOfFilmByDate(new Date()).then(value => dateFilmByDate.value = value)
    loadSpecialEventsInFilmList().then(value => specialEventsInFilmList.value = value)

    console.log( 'data.value -> apiGetFilmList()', data.value )
    console.log('apiGetSeancesOfFilm', await apiGetSeancesOfFilm(3))
    console.log('apiGetUrlOfFilm', await apiGetUrlOfFilm(1))
    console.log('apiGetListOfFilmByDate', await apiGetListOfFilmByDate(new Date('2024-03-20')))

})

interface ISpecialEventsInFilmList {
    seance: ISeance
    filmData: ITicketFilm
}

async function loadSpecialEventsInFilmList(): Promise<any[] | ISpecialEventsInFilmList[]> {
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

    console.log('loadSpecialEventsInFilmList', toReturn)

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

    @media (max-width: scss-params.$fp-breakpoint-sm) {
        display: none;
    }
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
