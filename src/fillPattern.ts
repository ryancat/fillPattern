// my awesom library
import {IPatternConfig, IRenderer, TextureElement, RendererType, ITexture, TextureModeType} from './types'
import util from './util'
// import svgRenderer from './renderers/svg'
import canvasRenderer from './renderers/canvas'
import fillPatternState from './fillPatternState'
import BaseTexture from './textures/Base'
import LineTexture from './textures/Line'

/***** Util functions *****/
/**
 * Get the hash for given fill pattern config.
 * The hash result is used to decide if given config is in cached patterns.
 * @param patternConfig fill pattern config
 * @returns string hash value
 */
function getHash(patternConfig: IPatternConfig, rendererType: RendererType): string {
  return `${rendererType}-${JSON.stringify(patternConfig)}`
}

const fillPattern = {
  RendererType,

  TextureModeType,

  loadTexture: (texture: ITexture): void => {
    if (!fillPatternState.textureMap[texture.name]) {
      // util.applyMixins(texture, [BaseTexture])
      // util.mixin(texture, new BaseTexture())

      fillPatternState.textureMap[texture.name] = new BaseTexture(texture)
    } else {
      throw new Error(`Duplicated texture name: ${texture.name}`)
    }
  },

  /**
   * Get texture from the pattern config
   * @param patternConfig fill pattern config
   * @returns canvas pattern that can be used for fill instruction
   */
  getTexture: (patternConfig: IPatternConfig, rendererType: RendererType): TextureElement => {
    const hashKey: string = getHash(patternConfig, rendererType)
    let renderer

    switch (rendererType) {
      case RendererType.Canvas:
        renderer = canvasRenderer
        break

      // case RendererType.SVG:
      //   renderer = svgRenderer
      //   break

      default:
        throw new Error(`Unknown renderer type: ${rendererType}`)
    }

    if (!fillPatternState.fillPatternCache[hashKey]) {
      const texture = fillPatternState.textureMap[patternConfig.name]

      if (!texture) {
        throw new Error(`No such texture to load: ${patternConfig.name}\n Please load the texture first!`)
      }

      // Draw on the texture recursively and get the expected result
      const textureElement = renderer.getInitTexture(patternConfig.backgroundColor)

      if (!texture.draw) {
        throw new Error(`Texture has no pre-defined draw function: ${texture.name}`)
      }

      texture.draw(textureElement, renderer, {
        mode: patternConfig.mode,
      })

      fillPatternState.fillPatternCache[hashKey] = textureElement
    }

    return fillPatternState.fillPatternCache[hashKey]
  },

  textureModeType: {
    Light: TextureModeType.Light,
    Medium: TextureModeType.Medium,
    Heavy: TextureModeType.Heavy,
  },
}

// Need to load all built-in textures
util.loadTexture(new LineTexture())

export default fillPattern
