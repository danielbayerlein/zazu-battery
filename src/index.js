const os = require('os');

const platform = os.platform();
let battery;

switch (platform) {
  case 'darwin':
    battery = require('./battery-macos.js'); // eslint-disable-line global-require
    break;
  default:
    throw new Error('The operating system is not supported.');
}

module.exports = () => () => (
  new Promise(resolve => resolve([
    {
      id: 'zazu-battery.capacity',
      title: `${battery.capacity}%`,
      subtitle: 'Capacity',
      icon: 'fa-battery-half',
    },
    {
      id: 'zazu-battery.timeLeft',
      title: battery.timeLeft,
      subtitle: 'Time Left',
      icon: 'fa-clock-o',
    },
    {
      id: 'zazu-battery.temperature',
      title: `${battery.temperature} °C`,
      subtitle: 'Temperature',
      icon: 'fa-thermometer-half',
    },
    {
      id: 'zazu-battery.cycles',
      title: battery.cycles,
      subtitle: 'Charge Cycles Completed',
      icon: 'fa-refresh',
    },
    {
      id: 'zazu-battery.health',
      title: `${battery.health}%`,
      subtitle: 'Health',
      icon: 'fa-medkit',
    },
  ]))
);
