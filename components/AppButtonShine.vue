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

const props = defineProps<{
    message?: string
}>()

const container: Ref<UnwrapRef<null | HTMLElement>> = ref(null)
const shineElement: Ref<UnwrapRef<null | HTMLElement>> = ref(null)

onMounted(()=> {
    nextTick(() => {

        if( ! container.value)      return
        if( ! shineElement.value)   return

        container.value.addEventListener('mousemove', (ev)=> {onMouseOver(ev, container.value!, shineElement.value! )})
        container.value.addEventListener('mouseleave', (ev)=> {onMouseLeave(ev, container.value!, shineElement.value!)})
    })
})

function onMouseOver(mouseEvent: MouseEvent, cardElement: HTMLElement, cardShineElement: HTMLElement) {
    const poseX = mouseEvent.offsetX < 0 ? 0 : mouseEvent.offsetX
    const poseY = mouseEvent.offsetY < 0 ? 0 : mouseEvent.offsetY
    const cardClientRect = cardElement.getBoundingClientRect()

    let transformCard = "scale3d(1.08, 1.08, 1.08) perspective(100vh)"
    transformCard += " "
    //rotateX between -9 and +9
    transformCard += "rotateX(" + ( ( ( (poseY / cardClientRect.height) * 18 ) - 9 )) + "deg)"
    transformCard += " "
    //rotateY between -13 and +13
    transformCard += "rotateY(" + ( ( ( (poseX / cardClientRect.width) * 26 ) - 13 ) * -1 ) + "deg)"

    transformCard += " "
    //translateX between -3 and +3
    transformCard += "translateX(" + ( ( (poseX / cardClientRect.width) * 6 ) - 3 ) + "px)"
    transformCard += " "
    //translateY between -5 and +5
    transformCard += "translateY(" + ( ( (poseY / cardClientRect.height) * 10 ) - 5 ) + "px)"

    cardElement.style.setProperty("transform", transformCard)

    //opacity of ShineLayer between 0.7 and 0.5
    const backgroundShineLayerOpacity = ((poseY / cardClientRect.height) * 0.2) + 0.5
    //bottom=0deg; left=90deg; top=180deg; right=270deg;
    let backgroundShineLayerDegree = (Math.atan2(poseY - (cardClientRect.height/2), poseX - (cardClientRect.width/2)) * 180/Math.PI) - 90
    backgroundShineLayerDegree = backgroundShineLayerDegree < 0 ? backgroundShineLayerDegree += 360 : backgroundShineLayerDegree
    const backgroundShineLayer = "linear-gradient(" + backgroundShineLayerDegree + "deg, rgba(45,45,45," + backgroundShineLayerOpacity + ") 0%, rgba(45,45,45,0) 80%)"

    cardShineElement.style.setProperty("background", backgroundShineLayer)
}

function onMouseLeave(mouseEvent: MouseEvent, cardElement: HTMLElement, cardShineElement: HTMLElement) {
    cardShineElement.style.setProperty("background", 'linear-gradient(0deg, rgba(45,45,45,0) 0%, rgba(45,45,45,0) 80%)')
    cardElement.style.setProperty('transform', 'scale3d(1, 1, 1)')
}
</script>





<style lang="scss" scoped >
.v-app-button-shine__container {
    position: relative;
    display: inline-block;
    transform: scale3d(1, 1, 1);
    transition: all 1s ease-out, filter 0.75s ease-out;
    box-shadow: 40px 33px 26px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.15);
    filter: saturate(98%) brightness(98%) contrast(95%);
    background: black;
    overflow: hidden;
    border-radius: var(--lc-radius--min);
    cursor: pointer;
    user-select: none;

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
