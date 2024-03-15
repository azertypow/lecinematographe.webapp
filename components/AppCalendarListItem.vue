<template>
    <section
        class="v-app-calendar-list-item"
    >
        <div class="app-flex app-flex--align_center app-flex--gap_large app-flex--nowrap">
            <img
                class="v-app-calendar-list-item__cover"
                :alt="`image de couverture de ${title}`"
                :src="coverUrl"
            />
            <h3 class="v-app-calendar-list-item__title"
            >{{title}}</h3>
            <p>{{hour}}</p>
        </div>
    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'
import type {ITicketFilm} from "~/_utils/apiTicket";

const props = defineProps<{
    title: string,
    coverUrl: string,
    hour: string,
    enPresenceDe?: string
}>()
</script>





<style lang="scss" scoped >
.v-app-calendar-list-item {
}

.v-app-calendar-list-item__cover {
    display: block;
    width: 5em;
    aspect-ratio: 2/1;
    object-fit: cover;
}
.v-app-calendar-list-item__title {}
</style>
