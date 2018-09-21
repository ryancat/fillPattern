import { ITexture } from './types'
import fillPatternState from './fillPatternState'
import BaseTexture from './textures/Base'

const gcdCache: {[key: string]: number} = {}

const util = {
  gcd: (number1: number, number2: number): number => {
    if (typeof number1 !== 'number' || typeof number2 !== 'number' ||
    (Number.isNaN || isNaN)(number1) || (Number.isNaN || isNaN)(number2) ||
    number1 <= 0 || number2 <= 0) {
      return -1
    }

    const key1 = number1 + '-' + number2
    const key2 = number2 + '-' + number1

    if (gcdCache[key1]) {
      return gcdCache[key1]
    }

    if (number1 !== number2) {
      if (number1 > number2) {
        number1 = number1 - number2
      } else {
        number2 = number2 - number1
      }

      gcdCache[key1] = util.gcd(number1, number2)
      gcdCache[key2] = gcdCache[key1]
      return gcdCache[key1]
    } else {
      gcdCache[key1] = number1
      return number1
    }
  },

  lcm: (number1: number, number2: number): number => {
    if (typeof number1 !== 'number' || typeof number2 !== 'number' ||
    (Number.isNaN || isNaN)(number1) || (Number.isNaN || isNaN)(number2) ||
    number1 <= 0 || number2 <= 0) {
      return -1
    }

    return number1 * number2 / util.gcd(number1, number2)
  },

  mixin: (destinationObj: {[key: string]: any}, sourceObj: {[key: string]: any}): void => {
    let key: string
    for (key in sourceObj) {
      if (sourceObj.hasOwnProperty(key)) {
        if (!destinationObj.hasOwnProperty(key)) {
          destinationObj[key] = sourceObj[key]
        }
      }
    }
  },

  applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach((baseCtor) => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
          derivedCtor.prototype[name] = baseCtor.prototype[name]
      })
    })
  },

  loadTexture: (texture: ITexture): void => {
    if (!fillPatternState.textureMap[texture.name]) {
      // util.applyMixins(texture, [BaseTexture])
      // util.mixin(texture, new BaseTexture())

      fillPatternState.textureMap[texture.name] = texture
    } else {
      throw new Error(`Duplicated texture name: ${texture.name}`)
    }
  },
}

export default util
