const execa = require('execa')
const plist = require('plist')
const util = require('util')

module.exports = class Battery {
  constructor () {
    const COMMAND = 'ioreg'
    const ARGUMENTS = ['-n', 'AppleSmartBattery', '-r', '-a']

    this.battery = plist.parse(execa.sync(COMMAND, ARGUMENTS).stdout)[0]
  }

  getCycles () {
    return this.battery.CycleCount
  }

  getHealth () {
    const percentage = (this.battery.MaxCapacity / this.battery.DesignCapacity) * 100

    return Number(percentage.toFixed())
  }

  getTemperature () {
    const celsius = this.battery.Temperature / 100

    return Number(celsius.toFixed(1))
  }

  getCapacity () {
    const percentage = (this.battery.CurrentCapacity / this.battery.MaxCapacity) * 100

    return Number(percentage.toFixed())
  }

  getTimeLeft () {
    if (this.battery.ExternalConnected && this.battery.FullyCharged) {
      return '∞'
    }

    const time = this.battery.IsCharging ? this.battery.AvgTimeToFull : this.battery.AvgTimeToEmpty
    const hours = parseInt(time / 60, 10)
    let minutes = parseInt(time % 60, 10)
    minutes = `${minutes < 10 ? 0 : ''}${minutes}`

    return util.format('%s:%s', hours, minutes)
  }
}
