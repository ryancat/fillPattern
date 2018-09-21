// My demo script
fp = fillPattern.default

const canvas = document.getElementById('stage')
const ctx = canvas.getContext('2d')

canvas.width = 500
canvas.height = 500

fp.loadTexture({
  name: 'texture1',
  mode: {
    'light': {
      name: 'line',
      thickness: 1,
      distance: 10,
      rotation: 0,
      color: 'green'
    },
    'heavy': {
      name: 'line',
      // thickness: 2,
      // distance: 4,
      // rotation: Math.PI / 4,
      // color: '#b1b1b1'
    }
  }
})

ctx.rect(20, 20, 200, 200)
ctx.fillStyle = ctx.createPattern(fp.getTexture({
  name: 'texture1',
  mode: 'heavy',
  backgroundColor: 'red'
}, fp.RendererType.Canvas), 'repeat')
ctx.fill()
