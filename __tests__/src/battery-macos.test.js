/* eslint global-require: 0 */

describe('battery-macos.js', () => {
  jest.mock('execa');
  const execa = require('execa');
  execa.sync.mockImplementation(() => require('../../__mocks__/ioreg.js'));

  const battery = require('../../src/battery-macos.js');

  test('returns an object with the expected structure', () => {
    expect(battery).toEqual({
      capacity: 89,
      cycles: 54,
      health: 84,
      temperature: 30.7,
      timeLeft: '0:47',
    });
  });
});
