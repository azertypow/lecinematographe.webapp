export function onMouseOver(mouseEvent: MouseEvent, cardElement: HTMLElement, cardShineElement: HTMLElement) {
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

export function onMouseLeave(mouseEvent: MouseEvent, cardElement: HTMLElement, cardShineElement: HTMLElement) {
    cardShineElement.style.setProperty("background", 'linear-gradient(0deg, rgba(45,45,45,0) 0%, rgba(45,45,45,0) 80%)')
    cardElement.style.setProperty('transform', 'scale3d(1, 1, 1)')
}
