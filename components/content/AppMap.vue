<template>
    <a class="v-app-map"
       href="https://google.com/"
       target="_blank"
    >
        <img
            alt="image carte"
            src="@/assets/carte_cinemato_v3.jpeg"
        />
    </a>
</template>





<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    message?: string
}>()
</script>





<style lang="scss" scoped >
.v-app-map {
    width: 100%;
}

a {
    all: unset;
    cursor: pointer;

    &:before, &:after {
        content: none;
    }
}

img {
    display: block;
    width: 100%;
}
</style>
