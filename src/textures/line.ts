import {
  IDimension,
  ITexture,
  TextureModeType,
  TextureElement,
  IRenderer,
  IDrawConfig,
  ISimpleTextureConfig,
  ITextureConfig} from '../types'
import BaseTexture from './base'
import util from '../util'

const DEFAULT_PATTERN_SIZE: number = 10

function calculateDimensions(distance: number, rotation: number): IDimension {
  let width: number
  let height: number

  rotation = rotation % Math.PI

  if (rotation === 0) {
    width = DEFAULT_PATTERN_SIZE
    height = distance
  } else if (rotation === Math.PI * 0.5) {
    width = distance
    height = DEFAULT_PATTERN_SIZE
  } else {
    width = distance / Math.sin(rotation)
    height = distance / Math.abs(Math.cos(rotation))
  }

  return {
    height,
    width,
  }
}

const lightModeTexture: ISimpleTextureConfig = {
  color: '#000000',
  distance: 4,
  rotation: 0,
  thickness: 1,
}

const mediumModeTexture: ISimpleTextureConfig = {
  color: '#000000',
  distance: 4,
  rotation: 0,
  thickness: 2,
}

const heavyModeTexture: ISimpleTextureConfig = {
  color: '#000000',
  distance: 4,
  rotation: 0,
  thickness: 3,
}

class LineTexture extends BaseTexture implements ITexture {
  public name: string = 'line'

  public mode: {[key: string]: ISimpleTextureConfig} = {
    // TODO: How to use enums for the default texture config name?
    default: mediumModeTexture,
    light: lightModeTexture,
    medium: mediumModeTexture,
    heavy: heavyModeTexture,
  }

  public draw(textureElement: TextureElement, renderer: IRenderer, drawConfig: IDrawConfig) {
    const {mode, config} = drawConfig

    const textureConfig: ISimpleTextureConfig = Object.assign({},
      // TODO: default to the medium mode, but it should really be some fallback mode
      this.mode[mode || TextureModeType.Medium],
      config)

    textureConfig.dimensions = textureConfig.dimensions ||
      calculateDimensions(textureConfig.distance, textureConfig.rotation)

    renderer.drawLineTexture(textureElement, textureConfig)
  }
}

export default LineTexture
