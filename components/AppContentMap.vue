<template>
    <div
        class="v-app-content-map"
    >
        <AppMap/>
    </div>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    message?: string
}>()
</script>





<style lang="scss" scoped >
.v-app-content-map {
}
</style>
