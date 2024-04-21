<template>
    <section
        class="v-app-info"
    >
        <div class="v-app-info__text"
        >
            Billetterie sur place (billetterie en ligne prochainement!)
        </div>
        <img class="v-app-info__close"
             src="@/assets/icons/cancel_FILL0_wght400_GRAD0_opsz24.svg"
             alt="close info"
             @click="useBarIsOpen().value = false"
        />
    </section>
</template>





<script setup lang="ts">
import {useBarIsOpen} from "~/composables/states";

</script>





<style lang="scss" scoped >
.v-app-info {
    background: var(--lc-color--blue-light);
    position: relative;
    padding-left: 1rem;
    padding-right: 2.5rem;
}

.v-app-info__text {
    text-align: center;
}

.v-app-info__close {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translate(0, -50%);
}
</style>
