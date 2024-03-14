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
    console.log(route.query)
})

</script>





<style lang="scss">
.v-slug {

    --slug-left-padding-coll: 6;
    --slug-right-padding-coll: 2;

    box-sizing: border-box;
    padding-left: calc(100% / 24 * var(--slug-left-padding-coll));
    padding-right: calc(100% / 24 * var(--slug-right-padding-coll));

    h2 {
      position: relative;
      transform: translate(-100%, 100%);
      width: calc(100% / (24 - var(--slug-left-padding-coll) - var(--slug-right-padding-coll)) * var(--slug-left-padding-coll));
      margin: 0;
      font-size: .5rem;
      line-height: .5rem;
      top: .5rem;

      + p {
        margin-top: 0;
      }
    }
}
</style>
