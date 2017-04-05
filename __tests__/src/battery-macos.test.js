/* eslint-disable global-require */

describe('battery-macos.js', () => {
  let battery;

  beforeEach(() => {
    jest.mock('execa');
    const execa = require('execa');
    execa.sync.mockImplementation(() => require('../../__mocks__/ioreg.js'));

    const Battery = require('../../src/battery-macos.js');
    battery = new Battery();
  });

  test('returns the expected cycles', () => {
    expect(battery.getCycles()).toBe(54);
  });

  test('returns the expected capacity', () => {
    expect(battery.getCapacity()).toBe(89);
  });

  test('returns the expected health', () => {
    expect(battery.getHealth()).toBe(84);
  });

  test('returns the expected temperature', () => {
    expect(battery.getTemperature()).toBe(30.7);
  });

  test('returns the expected time left', () => {
    expect(battery.getTimeLeft()).toBe('0:47');
  });
});
