// todo: need to be simplify by Class

export interface ICardEffectOption {
    scale: number,
    perspectiveValue: number,
    perspectiveUnit: 'vh' | 'px',
    color: {
        r: number,
        g: number,
        b: number,
    },
    opacityIntensity: number, //between 0 and .8
}

export function onMouseOver(
    mouseEvent: MouseEvent,
    cardElement: HTMLElement,
    cardShineElement: HTMLElement,
    option: ICardEffectOption,
) {
    const poseX = mouseEvent.offsetX < 0 ? 0 : mouseEvent.offsetX
    const poseY = mouseEvent.offsetY < 0 ? 0 : mouseEvent.offsetY
    const cardClientRect = cardElement.getBoundingClientRect()

    let transformCard = `scale3d(${option.scale}, ${option.scale}, ${option.scale}) perspective(${option.perspectiveValue}${option.perspectiveUnit})`
    transformCard += " "
    //rotateX between -9 and +9
    transformCard += `rotateX(${    ((poseY / cardClientRect.height) * 5) - 5}deg)`
    transformCard += " "
    //rotateY between -13 and +13
    transformCard += `rotateY(${    (((poseX / cardClientRect.width) * 5) - 5) * -1}deg)`
    transformCard += " "

    //translateX between -3 and +3
    transformCard += "translateX(" + ( ( (poseX / cardClientRect.width) * 6 ) - 3 ) + "px)"
    transformCard += " "

    //translateY between -5 and +5
    transformCard += "translateY(" + ( ( (poseY / cardClientRect.height) * 10 ) - 5 ) + "px)"

    cardElement.style.setProperty("transform", transformCard)

    //opacity of ShineLayer between 0.7 and 0.5
    const backgroundShineLayerOpacity = ((poseY / cardClientRect.height) * 0.2) + option.opacityIntensity
    let backgroundShineLayerDegree = (Math.atan2(poseY - (cardClientRect.height/2), poseX - (cardClientRect.width/2)) * 180/Math.PI) - 90
    backgroundShineLayerDegree = backgroundShineLayerDegree < 0 ? backgroundShineLayerDegree += 360 : backgroundShineLayerDegree
    const backgroundShineLayer = `linear-gradient(${backgroundShineLayerDegree}deg, rgba(${option.color.r},${option.color.g},${option.color.b},${backgroundShineLayerOpacity}) 0%, rgba(${option.color.r},${option.color.g},${option.color.b},0) 80%)`

    cardShineElement.style.setProperty("background", backgroundShineLayer)
}

export function onMouseLeave(mouseEvent: MouseEvent, cardElement: HTMLElement, cardShineElement: HTMLElement, option: ICardEffectOption) {
    cardShineElement.style.setProperty("background", `linear-gradient(0deg, rgba(${option.color.r},${option.color.g},${option.color.b},0) 0%, rgba(${option.color.r},${option.color.g},${option.color.b},0) 80%)`)
    cardElement.style.setProperty('transform', 'scale3d(1, 1, 1)')
}
