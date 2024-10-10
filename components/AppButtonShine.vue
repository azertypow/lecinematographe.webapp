<template>
    <div class="v-app-button-shine"
    >
        <div class="v-app-button-shine__container"
             ref="container"
        >
            <div class="v-app-button-shine__container__shine"
                 ref="shineElement"
            ></div>
            <div class="v-app-button-shine__container__button"
            >
                <slot/>
            </div>
        </div>

    </div>
</template>





<script setup lang="ts">
import {defineProps, type Ref, type UnwrapRef} from 'vue'
import {type ICardEffectOption, onMouseLeave, onMouseOver} from "~/_utils/shineEffect";

const props = defineProps<{
    message?: string
}>()

const container: Ref<UnwrapRef<null | HTMLElement>> = ref(null)
const shineElement: Ref<UnwrapRef<null | HTMLElement>> = ref(null)

onMounted(()=> {
    nextTick(() => {

        if( ! container.value)      return
        if( ! shineElement.value)   return

        const mouseOverOptions: ICardEffectOption = {
            scale: 1.08,
            perspectiveValue: 100,
            perspectiveUnit: 'vh',
            color: {
                r: 40,
                g: 40,
                b: 40,
            },
            opacityIntensity: .5,
        }

        container.value.addEventListener('mousemove', (ev)=> {onMouseOver(ev, container.value!, shineElement.value!, mouseOverOptions)})
        container.value.addEventListener('mouseleave', (ev)=> {onMouseLeave(ev, container.value!, shineElement.value!,  mouseOverOptions)})
    })
})
</script>





<style lang="scss" scoped >
.v-app-button-shine__container {
    position: relative;
    display: block;
    transform: scale3d(1, 1, 1);
    transition: all 1s ease-out, filter 0.75s ease-out;
    box-shadow: 40px 33px 26px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.15);
    filter: saturate(98%) brightness(98%) contrast(95%);
    background: black;
    overflow: hidden;
    border-radius: var(--lc-radius--min);
    cursor: pointer;
    user-select: none;
    color: white;

    .v-app-button-shine__container__shine {
        background: linear-gradient(0deg, rgba(45,45,45,0) 0%, rgba(45,45,45,0) 80%);
        transition: all 0.2s ease-out;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
    }

    .v-app-button-shine__container__button {
        position: relative;
        display: block;
        height: auto;
        padding: .05rem .5rem;
        line-height: 1rem;
        font-size: .45rem;
        z-index: 11;
        text-transform: uppercase;
    }

    &:hover {
        filter: saturate(100%) brightness(100%) contrast(100%);
    }
}
</style>
