<template>
    <a class="v-app-map"
       href="https://www.google.com/maps/place/Le+Cin%C3%A9matographe/@46.5204603,6.6222849,17z/data=!3m1!4b1!4m6!3m5!1s0x478c2fb901ac72c3:0x53e223f566e7785b!8m2!3d46.5204603!4d6.6248598!16s%2Fg%2F11vqhwq6h5?entry=ttu"
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
