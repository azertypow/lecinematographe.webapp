<template>
    <div class="v-app__header-container"
    >
        <AppHeader/>
    </div>

    <div class="v-app__page-container"
    >
        <NuxtPage/>
    </div>
</template>
<style>
.v-app__header-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}

.v-app__page-container {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: calc( var(--lc-header-height) + 1rem);
}
</style>
