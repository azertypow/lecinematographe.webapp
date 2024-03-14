<template>
    <section
        class="v-app-film-list-junior"
    >

    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    message?: string
}>()
</script>





<style lang="scss" scoped >
.v-app-film-list-junior {
    color: red;
    border: solid white 1px;
}
</style>
