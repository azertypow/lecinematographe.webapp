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
            <div>
                <div class="v-index__section-today">
                    <AppFilmList
                        :ticket-film-array="data.filmlist"
                    />
                </div>
                <div class="v-index__section-calendra">
                    <AppCalendar/>
                </div>
                <div class="v-index__section-calendra">
                    <AppFilmDetails/>
                </div>
            </div>
        </div>
        <AppFooter/>
    </div>
</template>
<script setup lang="ts">
import type {Ref, UnwrapRef} from "vue";
import {gapiGetFilmList, type IFilmListResponse} from "~/_utils/apiTicket";

const data: Ref<UnwrapRef<null| IFilmListResponse>> = ref(null)

onMounted(async () => {
    data.value = await gapiGetFilmList()
})

</script>

<style lang="scss" scoped >
</style>
