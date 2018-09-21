export type TextureElement = HTMLCanvasElement | SVGDefsElement
export type IRenderableElement = HTMLCanvasElement | SVGElement

export interface IDimension {
  width: number
  height: number
}

export interface IPosition {
  x: number
  y: number
}

export interface IRenderer {
  getInitTexture: (backgroundColor: string) => TextureElement
  // TODO: In SVG case, the source texture is actually just a svg pattern element
  // We need to make some changes here to get this part working
  combineTextures: (destinationTextureElement: TextureElement, sourceTextureElement: TextureElement) => void
  getDataURL: (textureElement: TextureElement) => string
  getTextureSize: (textureElement: TextureElement) => IDimension
  // Rendering related api
  // drawCircleTexture: (textureElement: TextureElement, textureConfig: ITextureConfig) => void
  drawLineTexture: (textureElement: TextureElement, textureConfig: ITextureConfig) => void
  // drawSquareTexture: (textureElement: TextureElement, textureConfig: ITextureConfig) => void
  // drawDisabledTexture: (textureElement: TextureElement, textureConfig: ITextureConfig) => void
  rotate: (element: IRenderableElement, angle: number, originPosition?: IPosition) => void
}

// export interface IRenderer<T extends TextureElement, S extends IRenderableElement> {
//   getInitTexture: (backgroundColor: string) => T
//   // TODO: In SVG case, the source texture is actually just a svg pattern element
//   // We need to make some changes here to get this part working
//   combineTextures: (destinationTextureElement: T, sourceTextureElement: T) => void
//   getDataURL: (textureElement: T) => string
//   getTextureSize: (textureElement: T) => IDimension
//   // Rendering related api
//   // drawCircleTexture: (textureElement: TextureElement, textureConfig: ITextureConfig) => void
//   drawLineTexture: (textureElement: T, textureConfig: ITextureConfig) => void
//   // drawSquareTexture: (textureElement: TextureElement, textureConfig: ITextureConfig) => void
//   // drawDisabledTexture: (textureElement: TextureElement, textureConfig: ITextureConfig) => void
//   rotate: (element: S, angle: number, originPosition?: IPosition) => void
// }

export interface IDrawConfig {
  mode?: string | TextureModeType,
  config?: ITextureConfig
}

export interface ITexture {
  mode: {[key: string]: ITextureConfig}
  name: string
  draw?: (textureElement: TextureElement, renderer: IRenderer, config: IDrawConfig) => void
}

export interface IPatternConfig {
  name: string
  backgroundColor: string
  mode: string
}

export interface ISimpleTextureConfig {
  name?: string
  thickness: number
  distance: number
  rotation: number
  color: string
  dimensions?: IDimension
  offsetX?: number
  offsetY?: number
}

export type ComplexTextureConfig = ISimpleTextureConfig[]

export type ITextureConfig = ISimpleTextureConfig | ComplexTextureConfig

/***** Enums *****/
export enum RendererType {
  Canvas,
  SVG,
}

export enum TextureModeType {
  Light,
  Medium,
  Heavy,
  Default,
}
