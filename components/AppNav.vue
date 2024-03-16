<template>
    <nav class="v-app-nav"
    >
        <div class="v-app-nav__pages-link"
             v-for="page of pagesData.pages"
             :class="{
                 'is-active': currentPageInfoOverSlug === page.slug
             }"
        >
            <div class="v-app-nav__pages-link__page-title"
                 @mouseover="currentPageInfoOverSlug = page.slug"
            >
                <nuxt-link class="v-app-nav__pages-link__page-title__value"
                           :href="page.slug"
                >
                    {{ page.title }}
                </nuxt-link>
            </div>

            <div class="v-app-nav__pages-link__page-subtitle app-width-gutter"
                 v-if="currentPageInfoOverSlug === page.slug"
            >
                <nuxt-link class="v-app-nav__pages-link__page-subtitle__values"
                           v-for="subsection of page.subsections"
                           :href="`${page.slug}/?a=${subsection}`"
                >
                    {{ subsection }}
                </nuxt-link>
            </div>

        </div>
    </nav>
</template>





<script setup lang="ts">
import {usePagesData, useMenuIsOpen} from "~/composables/states";

const menuIsOpen = useMenuIsOpen()

const pagesData = usePagesData()

const currentPageInfoOverSlug = ref('')
</script>





<style lang="scss" scoped >
.v-app-nav {
  user-select: none;
    border-radius: var(--lc-header-radius);
    color: white;
    background: rgba(40, 40, 40, 0.9);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(11.1px);
    -webkit-backdrop-filter: blur(11.1px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 3rem 1rem;
    max-height: 100%;
    box-sizing: border-box;
    overflow: auto;
}

a {
    color: white;
    text-decoration: none;

    &:before,
    &:after {
        content: none;
    }
}

.v-app-nav__pages-link {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 2fr;
    justify-items: start;
    align-items: start;
}

.v-app-nav__pages-link__page-title {
    //padding-bottom: 1rem;
    text-transform: uppercase;
    margin-top: 1rem;
}

.v-app-nav__pages-link__page-title__value {
    display: block;
    padding: .25rem 1rem;
    border-radius: 1rem;
     font-size: .75rem;
    border: none;

    &:hover {
        background: rgba(0, 0, 0, .25);
    }
}

.v-app-nav__pages-link__page-subtitle {
    position: relative;
    height: 0;
    overflow: visible;
    z-index: 500;
    padding-top: 0.25rem;
}

.v-app-nav__pages-link__page-subtitle__values {
    display: block;
}

</style>
