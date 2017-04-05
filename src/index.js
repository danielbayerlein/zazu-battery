const os = require('os');

const platform = os.platform();
let Battery;

switch (platform) {
  case 'darwin':
    Battery = require('./battery-macos.js'); // eslint-disable-line global-require
    break;
  default:
    throw new Error('The operating system is not supported.');
}

module.exports = () => () => {
  const battery = new Battery();

  return new Promise(resolve => resolve([
    {
      id: 'zazu-battery.capacity',
      title: `${battery.getCapacity()}%`,
      subtitle: 'Capacity',
      icon: 'fa-battery-half',
    },
    {
      id: 'zazu-battery.timeLeft',
      title: battery.getTimeLeft(),
      subtitle: 'Time Left',
      icon: 'fa-clock-o',
    },
    {
      id: 'zazu-battery.temperature',
      title: `${battery.getTemperature()} °C`,
      subtitle: 'Temperature',
      icon: 'fa-thermometer-half',
    },
    {
      id: 'zazu-battery.cycles',
      title: battery.getCycles(),
      subtitle: 'Charge Cycles Completed',
      icon: 'fa-refresh',
    },
    {
      id: 'zazu-battery.health',
      title: `${battery.getHealth()}%`,
      subtitle: 'Health',
      icon: 'fa-medkit',
    },
  ]));
};
