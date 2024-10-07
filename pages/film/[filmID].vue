<template>
    <section
        class="v-film-id"
    >
        <div class="v-film-id__info"
             v-if="data === null"
        >
            <h1>Chargement…</h1>
        </div>

        <div class="v-film-id__info"
             v-else-if="data.error"
        >
            <h1>{{ data.error }}</h1>
        </div>


        <div class="v-film-id__info"
             v-else
        >
            <div
                v-for="filmData of data.filmlist"
            >
                <div class="v-film-id__info__header-image"
                >
                    <AppFilmMin
                        :ticket-film="filmData"
                    />
                </div>
                <AppFilmDetails
                    :ticket-film="filmData"
                />
            </div>
        </div>

<!--        <div class="v-film-id__list-film-container"-->
<!--        >-->
<!--            <AppFilmList-->
<!--                v-if="filmList"-->
<!--                :ticket-film-array="filmList.filmlist"-->
<!--                :show-title="true"-->
<!--            />-->
<!--        </div>-->


    </section>
</template>





<script setup lang="ts">
import {defineProps, type Ref, type UnwrapRef} from 'vue'
import {apiGetFilmById, apiGetFilmList, type IFilmListResponse} from "~/_utils/apiTicket";

const props = defineProps<{

}>()

const data: Ref<UnwrapRef<null | IFilmListResponse>> = ref(null)

const filmList: Ref<UnwrapRef<null | IFilmListResponse>> = ref(null)

onMounted(() => {
    loadData()
})

async function loadData() {
    const filmID = useRoute().params.filmID

    if( typeof filmID !== 'string') return

    data.value = await apiGetFilmById( Number.parseInt(filmID) )

    //
    // apiGetFilmList().then(value => {
    //     filmList.value = value
    // })
}

</script>





<style lang="scss" scoped >
.v-film-id {
}
.v-film-id__info {
    min-height: calc(100vh - 10rem);
    display: flex;
    align-items: center;
    justify-content: center;
}

.v-film-id__info__header-image {
    margin: 1rem auto;
    width: min( 100%, 10rem );
}

.v-film-id__list-film-container {
    margin-top: 2rem;
}
</style>
