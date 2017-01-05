var player = require('play-sound')(opts = {})
var greenBean = require('green-bean')
const buzzers = {
  1: 'airplane_chime_x',
  2: 'bicycle_bell',
}
greenBean.connect('laundry', (laundry) => {
  laundry.endOfCycle.subscribe(() => {
    player.play(buzzers[1], (err) => {
      console.err(err)
    }
    )
  })
})
