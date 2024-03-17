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
            <div class="app-grid--column-24">
                <div class="v-index__section v-index__section--today">
                    <AppFilmList
                        :ticket-film-array="data.filmlist"
                        :show-title="true"
                    />
                </div>
                <div class="v-index__section v-index__section--button-agenda">
                    <button
                        class="app-flex__shrink-0 lc-button--is-negative lc-button--is-rounded"
                    ><img alt="image agenda" style="height: .75rem; width: .75rem" src="../assets/icons/material-date-range.svg"></button>
                </div>
                <div class="v-index__section v-index__section--calendar">
                    <AppCalendar/>
                </div>

                <div class="v-index__section v-index__section--fil-vignette app-flex app-grid--column-2 app-grid--gap_regular">
                    <div v-for="filmVignette of specialEventsInFilmList">
                        <AppFilmVignette
                            :da_depart="filmVignette.filmData.da_depart"
                            :tx_description="filmVignette.txt"
                            :tx_titre_lng="filmVignette.filmData.tx_titre_lng"
                            :ur_vignette="filmVignette.filmData.ur_vignette"
                        />
                    </div>
                </div>

                <div class="v-index__section v-index__section--fil-event app-flex app-grid--column-1 app-grid--gap_regular">
                    <AppEventDetails/>
                </div>

                <div class="v-index__section v-index__section--film-details app-flex app-flex--column app-flex app-flex--gap_regular">
                    <div v-for="filmData of data.filmlist">
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
    apiGetUrlOfFilm, type ITicketFilm
} from "~/_utils/apiTicket";

const data: Ref<UnwrapRef<null | IFilmListResponse>> = ref(null)
const specialEventsInFilmList: Ref<UnwrapRef<{ txt: string; filmData: ITicketFilm }[] | null>> = ref(null)

onMounted(async () => {
    data.value = await apiGetFilmList()
    specialEventsInFilmList.value = await loadSpecialEventsInFilmList()

    console.log( 'data.value -> apiGetFilmList()', data.value )
    console.log('apiGetSeancesOfFilm', await apiGetSeancesOfFilm(3))
    console.log('apiGetUrlOfFilm', await apiGetUrlOfFilm(1))
    console.log('apiGetListOfFilmByDate', await apiGetListOfFilmByDate(new Date('2024-03-20')))

})

async function loadSpecialEventsInFilmList(): Promise<any[] | { txt: string; filmData: ITicketFilm }[]> {
    if(data.value === null) return []
    if(!data.value.filmlist) return []

    const toReturn: {
        txt: string,
        filmData: ITicketFilm,
    }[] = []

    for (const filmData of data.value.filmlist) {
        const filmEvent = await apiGetSeancesOfFilm(filmData.id_film)
        filmEvent.seance.forEach(seance => {
            if( seance.tx_seance.length < 1 ) return
            toReturn.push({
                txt: seance.tx_seance,
                filmData: filmData,
            })
        })
    }

    console.log('loadSpecialEventsInFilmList', toReturn)

    return toReturn
}

</script>

<style lang="scss" scoped >
.v-index__section--fil-vignette {
    padding: var(--app-gutter_regular);
    width: min(100%, var(--lc-max-width--lg));
    margin: auto;
}

.v-index__section {
  grid-column: 1 / span 24;
}

.v-index__section--button-agenda {
    grid-column: 3 / span 2;
    justify-self: center;
}

.v-index__section--calendar {
  grid-column: 5 / span 16;
}
</style>
