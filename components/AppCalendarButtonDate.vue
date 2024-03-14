<template>
    <div
            class="v-app-calendar-button-date"
    >
        <div
            class="v-app-calendar-button-date__button"
        >

            <div class="date-day-day">{{['di', 'lu', 'ma', 'me', 'je', 've', 'sa'][date.getDay()]}}</div>
            <div class="date-day-number">{{date.getDate()}}</div>
        </div>
    </div>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    date: Date
}>()
</script>





<style lang="scss" scoped >
.v-app-calendar-button-date {
}
.v-app-calendar-button-date__button {
    user-select: none;
    cursor: pointer;
    background: white;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 4em;
    height: 4em;
    font-size: .5rem;
    line-height: 1em;
    border-radius: 100%;

    &:hover {
        background: var(--lc-color--orange);
    }
}

.date-day-day {
    text-transform: uppercase;
    padding-bottom: .15rem;
}

.date-day-number {
    font-size: .85rem;
}
</style>
