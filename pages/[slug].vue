<template>
    <section
        class="v-slug"
    >
        <ContentDoc/>
    </section>
</template>





<script setup lang="ts">
const route = useRoute()

onMounted(() => {
    // console.log(route.query)
})

</script>





<style lang="scss">
.v-slug {

    h1, h2, h3, h4, h5, h6 {
        a {
            border-bottom: none;
        }
    }

    > div {
        display: flex;
        align-items: center;
        flex-direction: column;

        > * {
            width: min(100%, var(--lc-max-width--reg));
            box-sizing: border-box;
            padding-left: var(--app-gutter_regular);
            padding-right: var(--app-gutter_regular);
        }

        > section {
            width: 100%;
            padding-left: 0;
            padding-right: 0;
        }
    }

    h3 {
        text-transform: uppercase;


        a {
            color: inherit;
        }
    }
}

</style>
