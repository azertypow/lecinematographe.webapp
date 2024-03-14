<template>
    <section
        class="v-app-film-list-senior"
    >
        Composant lists film sénior (quel est le critère?)
    </section>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    message?: string
}>()
</script>





<style lang="scss" scoped >
.v-app-film-list-senior {
    color: red;
    border: solid white 1px;
}
</style>
