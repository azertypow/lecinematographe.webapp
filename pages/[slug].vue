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

    > div {
        display: flex;
        align-items: center;
        flex-direction: column;

        > * {
            width: min(100%, var(--lc-max-width--reg));
        }

        > section {
            width: 100%;
        }
    }


    //--slug-left-padding-coll: 6;
    //--slug-right-padding-coll: 2;
    //
    //box-sizing: border-box;
    //padding-left: calc(100% / 24 * var(--slug-left-padding-coll));
    //padding-right: calc(100% / 24 * var(--slug-right-padding-coll));

    //h2 {
    //    position: relative;
    //    transform: translate(-100%, 100%);
    //    box-sizing: border-box;
    //    padding-left: var(--app-flex--gap_half);
    //    width: calc(100% / (24 - var(--slug-left-padding-coll) - var(--slug-right-padding-coll)) * var(--slug-left-padding-coll));
    //    margin: 0;
    //    font-size: .85rem;
    //    //top: .5rem;
    //
    //    + p {
    //        margin-top: 0;
    //    }
    //}

    h3 {
        text-transform: uppercase;


        a {
            color: inherit;
        }
    }
}

</style>
