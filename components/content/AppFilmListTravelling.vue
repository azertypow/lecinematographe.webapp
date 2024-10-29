<template>
    <section
        class="v-app-film-list-travelling"
    >
        <template
            v-if="data"
        >
            <AppFilmList
                    :show-title="false"
                :ticket-film-array="data"
            />
        </template>
    </section>
</template>





<script setup lang="ts">
import {defineProps, type Ref, type UnwrapRef} from 'vue'
import {apiGetFilmList, type IFilmListResponse} from "~/_utils/apiTicket";
import type {ApiTicketack_screening} from "~/_utils/apiTicketack";

const data: Ref<UnwrapRef<null | ApiTicketack_screening[]>> = ref(null)

onMounted(async () => {
    data.value = await apiGetFilmList()
})
</script>





<style lang="scss" scoped >
.v-app-film-list-travelling {
}
</style>
