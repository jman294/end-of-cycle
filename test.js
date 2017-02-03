var player = require('play-sound')(opts = {})

var beep = false
var endOfCycle = 0
var soundCount = 5

function requestCycleStatus(callback) {
  console.log('end of cycle: ', + endOfCycle)
  if (endOfCycle && soundCount > 0) {
    soundCount--
    callback()
  }
  if (!endOfCycle) {
    soundCount = 5
  }
}

setInterval(function() {
  console.log("Requesting cycle status.")
  requestCycleStatus(playBuzzer)   
}, 1000)
setTimeout(function () {
  endOfCycle = 1
}, 5000)

function playBuzzer () {
  player.play('buzzers/chime.wav')
}
