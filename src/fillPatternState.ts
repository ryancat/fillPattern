import { TextureElement, ITexture } from './types'

const fillPatternCache: {[key: string]: TextureElement} = {}
const textureMap: {[key: string]: ITexture} = {}

export default {
  fillPatternCache,
  textureMap,
}
