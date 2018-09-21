import {
  TextureElement,
  IRenderer,
  IDrawConfig,
  ITextureConfig,
  TextureModeType,
  ITexture,
  ComplexTextureConfig } from '../types'

import fillPatternState from '../fillPatternState'

export default class BaseTexture implements ITexture {
  public name: string = 'baseTexture'

  public mode: {[key: string]: ITextureConfig} = {
    // TODO: How to use enums for the default texture config name?
    default: {
      thickness: 1,
      distance: 3,
      rotation: 0,
      color: '#000000',
      offsetX: 0,
      offsetY: 0,
    },
  }

  constructor(textureOptions?: ITexture) {
    Object.assign(this, textureOptions)
  }

  public draw(textureElement: TextureElement, renderer: IRenderer, drawConfig: IDrawConfig) {
    const { mode, config } = drawConfig
    let textureConfigs: ITextureConfig = this.mode[mode || TextureModeType.Default]

    if (!Array.isArray(textureConfigs)) {
      textureConfigs = [textureConfigs]
    }

    textureConfigs.forEach((configDetails) => {
      const { name, ...detailConfigs } = configDetails

      if (!name) {
        // The pattern mode configs may contain any fill pattern as its children
        // layers. If it does so, it need to include the pattern name in the config
        // details. For basic fill patterns like line, circle or square, they need
        // to override draw function to draw by themselves, hence it should never
        // hit this condition here.
        throw new Error(`Do not know how to draw this config: ${name}`)
      }

      // The config has a pattern name, which means it's composed by
      // other patterns
      const childTexture = fillPatternState.textureMap[name]

      if (!childTexture) {
        throw new Error(`No such texture exist: ${name}`)
      }

      if (!childTexture.draw) {
        throw new Error(`Cannot draw texture: ${name}`)
      }

      childTexture.draw(textureElement, renderer, {
        mode,
        // We got some problem here
        // Should the config pass down to the grand children?
        config: Object.assign({}, detailConfigs, config),
      })
    })
  }
}
