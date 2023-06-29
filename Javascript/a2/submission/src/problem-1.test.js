const { formatNames } = require('./solutions');

describe('Problem 1 - formatNames() function', function() {
  const originalLog = console.log;

  afterEach(() => {
    console.log = originalLog;
  });

  test('formatNames() should call console.log()', function() {
    const mockedLog = () => (called = true);
    console.log = mockedLog;
    let called = false;

    formatNames();

    expect(called).toBe(true);
  });

  test('formatNames() should log correct format of all user names', function() {
    let consoleOutput = [];
    const mockedLog = output => consoleOutput.push(output);
    console.log = mockedLog;

    formatNames();

    expect(consoleOutput.length).toBe(150);
    expect(consoleOutput[0]).toBe('Paige Bools');
    expect(consoleOutput[149]).toBe('Elyse Bullick');
  });
});
