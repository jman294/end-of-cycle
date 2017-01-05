var player = require('play-sound')
var greenBean = require('green-bean')
const buzzers = {
  1: 'airplane_chime_x',
  2: 'bicycle_bell',
}
greenBean.connect('laundry', (laundry) => {
  laundry.endOfCycle.subscribe(() => {
    player.play()
  })
})
