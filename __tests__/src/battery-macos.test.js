describe('battery-macos.js', () => {
  let battery
  let execa

  beforeEach(() => {
    jest.mock('execa')
    execa = require('execa')
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  describe('when battery is used', () => {
    beforeEach(() => {
      execa.sync.mockImplementation(() => require('../../__mocks__/macos-battery-used.js'))

      const Battery = require('../../src/battery-macos.js')
      battery = new Battery()
    })

    test('returns the expected cycles', () => {
      expect(battery.getCycles()).toBe(55)
    })

    test('returns the expected capacity', () => {
      expect(battery.getCapacity()).toBe(52)
    })

    test('returns the expected health', () => {
      expect(battery.getHealth()).toBe(87)
    })

    test('returns the expected temperature', () => {
      expect(battery.getTemperature()).toBe(30.7)
    })

    test('returns the expected time left', () => {
      expect(battery.getTimeLeft()).toBe('4:41')
    })
  })

  describe('when battery is charging', () => {
    beforeEach(() => {
      execa.sync.mockImplementation(() => require('../../__mocks__/macos-battery-charging.js'))

      const Battery = require('../../src/battery-macos.js')
      battery = new Battery()
    })

    test('returns the expected cycles', () => {
      expect(battery.getCycles()).toBe(55)
    })

    test('returns the expected capacity', () => {
      expect(battery.getCapacity()).toBe(52)
    })

    test('returns the expected health', () => {
      expect(battery.getHealth()).toBe(86)
    })

    test('returns the expected temperature', () => {
      expect(battery.getTemperature()).toBe(30.6)
    })

    test('returns the expected time left', () => {
      expect(battery.getTimeLeft()).toBe('2:06')
    })
  })

  describe('when battery is fully charged', () => {
    beforeEach(() => {
      execa.sync.mockImplementation(() => require('../../__mocks__/macos-battery-fully-charged.js'))

      const Battery = require('../../src/battery-macos.js')
      battery = new Battery()
    })

    test('returns the expected cycles', () => {
      expect(battery.getCycles()).toBe(55)
    })

    test('returns the expected capacity', () => {
      expect(battery.getCapacity()).toBe(100)
    })

    test('returns the expected health', () => {
      expect(battery.getHealth()).toBe(86)
    })

    test('returns the expected temperature', () => {
      expect(battery.getTemperature()).toBe(29.8)
    })

    test('returns the expected time left', () => {
      expect(battery.getTimeLeft()).toBe('∞')
    })
  })
})
