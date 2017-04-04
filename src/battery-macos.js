const execa = require('execa');
const plist = require('plist');
const util = require('util');

const COMMAND = 'ioreg';
const ARGUMENTS = ['-n', 'AppleSmartBattery', '-r', '-a'];

const battery = plist.parse(execa.sync(COMMAND, ARGUMENTS).stdout)[0];

const cycles = battery.CycleCount;

const timeLeft = (() => {
  const time = battery.IsCharging ? battery.AvgTimeToFull : battery.AvgTimeToEmpty;
  const hours = parseInt(time / 60, 10);
  const minutes = parseInt(time % 60, 10);

  return util.format('%s:%s', hours, minutes);
})();

const temperature = (() => {
  const celsius = battery.Temperature / 100;

  return Number(celsius.toFixed(1));
})();

const capacity = (() => {
  const percentage = (battery.CurrentCapacity / battery.MaxCapacity) * 100;

  return Number(percentage.toFixed());
})();

const health = (() => {
  const percentage = (battery.MaxCapacity / battery.DesignCapacity) * 100;

  return Number(percentage.toFixed());
})();

module.exports = {
  cycles,
  capacity,
  health,
  temperature,
  timeLeft,
};
