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

    </section>
</template>





<script setup lang="ts">
import {defineProps, type Ref, type UnwrapRef} from 'vue'
import {apiGetFilmById, type IFilmListResponse} from "~/_utils/apiTicket";

const props = defineProps<{

}>()

const data: Ref<UnwrapRef<null | IFilmListResponse>> = ref(null)

onMounted(() => {
    loadData()
})

async function loadData() {
    const filmID = useRoute().params.filmID

    if( typeof filmID !== 'string') return

    data.value = await apiGetFilmById( Number.parseInt(filmID) )

    console.log( data.value )
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
    margin: auto;
    width: min( 100%, 10rem );
}
</style>
