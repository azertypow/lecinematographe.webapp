<template>
    <section
        class="v-slug"
    >
      <div>
        <h1>
          {{pagesContent?.title}}
        </h1>
      </div>

      <template v-for="block in pagesContent?.content">
        <div v-if="block.content.type === 'textWithTitle'"
             v-html="block.content.content.text"
        />

        <template v-else-if="block.content.type === 'film-list'" >
          <AppFilmListJunior v-if="block.content.content.category === 'kids'"/>
          <AppFilmListSenior v-else-if="block.content.content.category === 'senior'"/>
          <AppFilmListTravelling v-else-if="block.content.content.category === 'all'"/>
        </template>

        <div v-else-if="block.content.type === 'location'" style="width: min(100%, var(--lc-max-width--lg)); margin-left: auto; margin-right: auto;">
          <AppMap/>
        </div>

        <div class="v-slug__image">
          <img v-if="block.content.type === 'image'"
               :src="block.img_srcset.reg || ''"
          />
        </div>
      </template>
    </section>
</template>





<script setup lang="ts">
import {type Api_blocks, type Api_blocks_content, KQL_Admin} from "~/_utils/apiCms";
import AppFilmListJunior from "~/components/AppFilmListJunior.vue";

const route = useRoute()

const pagesContent: Ref< {
        slug: string,
        contenu: string,
        title: string,
        content: Api_blocks[]
    } | null> = ref(null)

const pageContent: ComputedRef<Api_blocks_content[]> = computed(
    () => pagesContent.value ?
        JSON.parse( pagesContent.value.contenu )
        : []
)

onMounted(async () => {
    pagesContent.value = (await KQL_Admin({
        query: `site().page('${route.params.slug}')`,
        select: {
            'title' : true,
            'slug' : true,
            'contenu' : true,
            'content': 'page.content.contenu.toBlocks_custom',
        },
    })).result

    console.log( "premier: ", pagesContent.value )

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

        > * {
            width: min(100%, var(--lc-max-width--reg));
            box-sizing: border-box;
            padding-left: var(--app-gutter_regular);
            padding-right: var(--app-gutter_regular);
            margin-left: auto;
            margin-right: auto;
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

.v-slug__image {
  &:not(:first-child) {
    margin-top: 1rem;
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  > img {
    display: block;
  }
}

</style>
