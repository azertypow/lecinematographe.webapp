<template>
    <div
            class="v-app-calendar-button-date app-flex app-flex--align_center app-flex--column"
            :class="{
              'is-active': isActive,
              'is-coming-soon': isComingSoon
            }"
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

const props = defineProps<{
    date: Date
    isActive: boolean
    isComingSoon?: boolean
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
    margin-bottom: var(--app-flex--gap_half);

    @media (max-width: 700px) {
        margin-bottom: .1rem;
        width: 3em;
        height: 3em;
    }

    &:hover {
      background: var(--lc-color--orange);
    }

    .is-active & {
        background: var(--lc-color--orange);
    }

    .is-coming-soon & {
        background: white;
        opacity: .5;
    }
}

.date-day-day {
    text-transform: uppercase;
    padding-bottom: .13rem;

    @media (max-width: 800px) {
        font-size: .3rem;
        line-height: 1em;
    }
}

.date-day-number {
    font-size: .7rem;

    @media (max-width: 800px) {
        font-size: .6rem;
    }
}
</style>
