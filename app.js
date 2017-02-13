var player = require('play-sound')(opts = {})
var greenBean = require('green-bean')
var uname = require('node-uname')
var fs = require('fs')
var gotPi = false

var unameInfo = uname()
console.log(unameInfo)
console.log("Type: " + typeof(unameInfo))
if (unameInfo.machine) {
   console.log("Machine: " + unameInfo.machine)
   if (unameInfo.machine.indexOf('x86') == 0) {
         console.log("This is not a pi so we can't update the board.")
      } else {
            console.log("This machine is not x86, so maybe we can update.")
            gotPi = true
         }
} else {
   console.log("No machine info found.")
}

if (gotPi) {
   var gpio = require('rpi-gpio')

   gpio.on('change', function(channel, endOfCycle) {
      // When the button is released
      if (endOfCycle == false) {
         index++
         if (index > Object.keys(languages).length) {
            index = 1
         }
         index = 1
         language = languages[index]
         console.log(language)
         // TODO: When language changes, play an mp3 file with new language
      }
   })
   gpio.setup(7, gpio.DIR_IN, gpio.EDGE_BOTH)
}

var soundPlayCount = 10

console.log('test')
greenBean.connect('laundry', function(laundry) {
   console.log('Connected to some laundries')
   var beep = false

   function requestCycleStatus(callback) {
      laundry.endOfCycle.read(function (endOfCycle) {
        console.log('end of cycle: ', + endOfCycle)
        if (endOfCycle) {
          callback()
        }
        if (!endOfCycle) {
          console.log('not end of cycle')
        }
      })
   }

   setInterval(function() {
      console.log("Requesting cycle status.")
      requestCycleStatus(playBuzzer)   
   }, 1000)
})

function playBuzzer () {
  player.play('buzzers/chime_60.wav')
}
