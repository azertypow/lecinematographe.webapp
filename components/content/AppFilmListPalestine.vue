<template>
    <section
        class="v-app-film-list-palestine"
    >
        <template
            v-if="data"
        >
            <AppFilmList
                :ticket-film-array="data.filmlist"
            />
        </template>
    </section>
</template>





<script setup lang="ts">
import {defineProps, type Ref, type UnwrapRef} from 'vue'
import {apiGetFilmList, type IFilmListResponse} from "~/_utils/apiTicket";

const data: Ref<UnwrapRef<null | IFilmListResponse>> = ref(null)

onMounted(async () => {
    data.value = await apiGetFilmList()
})
</script>





<style lang="scss" scoped >
.v-app-film-list-palestine {
}
</style>
