import {
  TextureElement,
  ITextureConfig,
  IPosition,
  IDimension,
  IRenderer,
  IRenderableElement,
  ISimpleTextureConfig } from '../types'
import util from '../util'

const canvasRenderer: IRenderer = {
  getInitTexture: (backgroundColor: string): HTMLCanvasElement => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('canvas 2d context is not supported in this browser')
    }

    canvas.width = 2
    canvas.height = 2

    context.fillStyle = backgroundColor || 'transparent'
    context.fillRect(0, 0, 2, 2)

    return canvas
  },

  drawLineTexture: (canvasTextureElement: HTMLCanvasElement, textureConfig: ISimpleTextureConfig): void => {
    if (!canvasTextureElement) {
      throw new Error('No canvas texture element to draw texture with')
    }

    const distance = textureConfig.distance
    const lineWidth = textureConfig.thickness
    const rotation = textureConfig.rotation
    const dimensions = textureConfig.dimensions

    if (!dimensions) {
      throw new Error('Line texture requires dimensions config')
    }

    const width = dimensions.width
    const height = dimensions.height
    // const isFill = textureConfig.isFill
    // const isStroke = textureConfig.isStroke
    const minY = height / 2 - distance
    const maxY = height / 2 + distance
    const minX = 0.5 * (width - Math.sqrt(width * width + height * height))
    const maxX = 0.5 * (width + Math.sqrt(width * width + height * height))
    const offsetX = (textureConfig.offsetX || 0) % width
    const offsetY = (textureConfig.offsetY || 0) % height
    const textureCanvas = document.createElement('canvas')
    const textureCtx = textureCanvas.getContext('2d')

    if (!textureCtx) {
      throw new Error('canvas 2d context is not supported in this browser')
    }

    textureCanvas.width = Math.floor(width)
    textureCanvas.height = Math.floor(height)

    // Start to draw lines
    // if (isFill) {
    //   textureCtx.fillStyle = config.color
    // }

    // if (isStroke) {
    //   textureCtx.strokeStyle = config.color
    // }

    textureCtx.strokeStyle = textureConfig.color

    // Rotate texture canvas
    canvasRenderer.rotate(textureCanvas, rotation)
    textureCtx.lineWidth = lineWidth
    textureCtx.beginPath()

    let y = minY
    while (y <= maxY) {
      textureCtx.moveTo(minX + offsetX, y + offsetY)
      textureCtx.lineTo(maxX + offsetX, y + offsetY)

      // The canvas will be round down to full pixel dimension, while the calculation
      // assumes we are using the original larger dimensions in fraction of a pixel.
      // This will compensate that.
      y += distance - 0.25
    }

    textureCtx.stroke()

    // if (isStroke) {
    //   textureCtx.stroke()
    // }

    // if (isFill) {
    //   textureCtx.fill()
    // }

    canvasRenderer.combineTextures(canvasTextureElement, textureCanvas)
  },

  rotate: (canvasElement: HTMLCanvasElement, angle: number, originPosition?: IPosition): void => {
    const context = canvasElement.getContext('2d')

    if (!context) {
      throw new Error('canvas 2d context is not supported in this browser')
    }

    const width = canvasElement.width
    const height = canvasElement.height
    let originX = width / 2
    let originY = height / 2

    // Rotate texture canvas
    if (originPosition) {
      originX = originPosition.x
      originY = originPosition.y
    }

    context.translate(originX, originY)
    context.rotate(angle)
    context.translate(-originX, -originY)
  },

  combineTextures: (
    destinationCanvasTextureElement: HTMLCanvasElement, sourceCanvasTextureElement: HTMLCanvasElement): void => {
    const context = destinationCanvasTextureElement.getContext('2d')

    if (!context) {
      throw new Error('canvas 2d context is not supported in this browser')
    }

    let finalCanvasWidth: number = destinationCanvasTextureElement.width
    let finalCanvasHeight: number = destinationCanvasTextureElement.height
    let finalCanvas: HTMLCanvasElement
    let finalContext: CanvasRenderingContext2D | null

    context.save()
    // In case we have multiple patterns, we need to use a texture canvas the size of the
    // least common multiplier of width and height of all of them
    finalCanvasWidth = util.lcm(finalCanvasWidth, sourceCanvasTextureElement.width)
    finalCanvasHeight = util.lcm(finalCanvasHeight, sourceCanvasTextureElement.height)

    if (finalCanvasWidth === destinationCanvasTextureElement.width &&
      finalCanvasHeight === destinationCanvasTextureElement.height) {
      // the canvas is still fine to use
      context.fillStyle = context.createPattern(sourceCanvasTextureElement, 'repeat')
      context.fillRect(0, 0, finalCanvasWidth, finalCanvasHeight)
    } else {
      // we need to update the dimension for the canvas
      finalCanvas = document.createElement('canvas')
      finalCanvas.width = finalCanvasWidth
      finalCanvas.height = finalCanvasHeight
      finalContext = finalCanvas.getContext('2d')

      if (!finalContext) {
        throw new Error('canvas 2d context is not supported in this browser')
      }

      // First fill the original texture
      finalContext.fillStyle = finalContext.createPattern(destinationCanvasTextureElement, 'repeat')
      finalContext.fillRect(0, 0, finalCanvasWidth, finalCanvasHeight)

      // Then fill the new texture
      finalContext.fillStyle = finalContext.createPattern(sourceCanvasTextureElement, 'repeat')
      finalContext.fillRect(0, 0, finalCanvasWidth, finalCanvasHeight)

      // Update canvas and reset it to final canvas
      destinationCanvasTextureElement.width = finalCanvasWidth
      destinationCanvasTextureElement.height = finalCanvasHeight
      context.clearRect(0, 0, finalCanvasWidth, finalCanvasHeight)
      context.drawImage(finalCanvas, 0, 0)
    }
    context.restore()
  },

  // TODO: In SVG case, the source texture is actually just a svg pattern element
  // // We need to make some changes here to get this part working
  getDataURL: (canvasTextureElement: HTMLCanvasElement): string => canvasTextureElement.toDataURL(),

  getTextureSize: (canvasTextureElement: HTMLCanvasElement): IDimension => {
    return {
      width: canvasTextureElement.width,
      height: canvasTextureElement.height,
    }
  },

  // // Rendering related api
  // drawCircleTexture: (textureElement: TextureElement, textureConfig: ITextureConfig) => void
  // drawSquareTexture: (textureElement: TextureElement, textureConfig: ITextureConfig) => void
  // drawDisabledTexture: (textureElement: TextureElement, textureConfig: ITextureConfig) => void
}

export default canvasRenderer
