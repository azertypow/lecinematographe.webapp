<template>
    <section
        class="v-slug"
    >
      <div>
        <h1>
          {{pagesContent?.title}}
        </h1>
      </div>

      <template v-for="block in pageContent">
        <div v-if="block.type === 'textWithTitle'"
             v-html="block.content.text"
        />

        <template v-else-if="block.type === 'film-list'" >
          <AppFilmListJunior v-if="block.content.category === 'kids'"/>
          <AppFilmListSenior v-else-if="block.content.category === 'senior'"/>
          <AppFilmListTravelling v-else-if="block.content.category === 'all'"/>
        </template>
        <div v-else-if="block.type === 'location'" style="width: min(100%, var(--lc-max-width--lg)); margin-left: auto; margin-right: auto;">
          <AppMap/>
        </div>
      </template>
    </section>
</template>





<script setup lang="ts">
import {type Api_ContentBlock, KQL_Admin} from "~/_utils/apiCms";
import AppFilmListJunior from "~/components/AppFilmListJunior.vue";

const route = useRoute()

const pagesContent: Ref< {
        slug: string,
        contenu: string,
        title: string,
    } | null> = ref(null)

const pageContent: ComputedRef<Api_ContentBlock[]> = computed(
    () => pagesContent.value ?
        JSON.parse( pagesContent.value.contenu )
        : []
)

onMounted(async () => {
    pagesContent.value = (await KQL_Admin({
        query: `site().page('${route.params.slug}')`,
        select: ['title', 'slug', 'contenu']
    })).result

})

</script>





<style lang="scss">
@use '@/assets/style/typography';

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

    p,
    ol,
    li {
      @extend .lc-font-inter;
    }
}

</style>
