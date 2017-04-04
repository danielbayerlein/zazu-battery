/* eslint global-require: 0 */

describe('index.js', () => {
  let os;
  let index;

  beforeEach(() => {
    jest.mock('os');
    os = require('os');

    jest.mock('../../src/battery-macos.js');
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  test('returns an Promise', () => {
    os.platform = jest.fn(() => 'darwin');
    index = require('../../src/');

    expect(index()()).toBeInstanceOf(Promise);
  });

  test('throws an Error if the operating system is not supported', () => {
    os.platform = jest.fn(() => 'android');

    expect(() => {
      index = require('../../src/');
    }).toThrow('The operating system is not supported.');
  });

  describe('macOS', () => {
    beforeEach(() => {
      os.platform = jest.fn(() => 'darwin');
      index = require('../../src/');
    });

    test('returns an array with the expected structure', () => (
      index()().then((result) => {
        expect(result).toEqual([
          {
            id: 'zazu-battery.capacity',
            title: '89%',
            subtitle: 'Capacity',
            icon: 'fa-battery-half',
          },
          {
            id: 'zazu-battery.timeLeft',
            title: '0:47',
            subtitle: 'Time Left',
            icon: 'fa-clock-o',
          },
          {
            id: 'zazu-battery.temperature',
            title: '30.7 °C',
            subtitle: 'Temperature',
            icon: 'fa-thermometer-half',
          },
          {
            id: 'zazu-battery.cycles',
            title: 54,
            subtitle: 'Charge Cycles Completed',
            icon: 'fa-refresh',
          },
          {
            id: 'zazu-battery.health',
            title: '84%',
            subtitle: 'Health',
            icon: 'fa-medkit',
          },
        ]);
      })
    ));
  });
});
