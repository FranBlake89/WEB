const { userUtils } = require('./solutions');

describe('Problem 8 - userUtils.createWelcomeEmails()', function() {
  test('userUtils should be an Object', function() {
    expect(typeof userUtils).toBe('object');
  });

  test('userUtils.createWelcomeEmails should be function', function() {
    expect(typeof userUtils.createWelcomeEmails).toBe('function');
  });

  test('userUtils.createWelcomeEmails should return an Object', function() {
    let result = userUtils.createWelcomeEmails();
    expect(typeof result).toBe('object');
  });

  test('userUtils.createWelcomeEmails should find all users with accessCount 0', function() {
    let result = userUtils.createWelcomeEmails();
    expect(Object.keys(result)).toEqual([
      'mdemars8@toplist.cz',
      'ohaddletone@w3.org',
      'ddelacroixu@bloglovin.com'
    ]);
  });

  test('userUtils.createWelcomeEmails should create custom email messages', function() {
    let result = userUtils.createWelcomeEmails();
    expect(result['mdemars8@toplist.cz']).toEqual(`Dear Montgomery DeMars
Welcome to imaginary application!  We're so happy you joined, and wanted
to take a moment to say hello. Our other users from Ninghai, China will
be glad to have you join them.

Have a great day!

Your Friends at the Imaginary Application Team`);

    expect(result['ohaddletone@w3.org']).toEqual(`Dear Olwen Haddleton
Welcome to imaginary application!  We're so happy you joined, and wanted
to take a moment to say hello. Our other users from Maiorca, Portugal will
be glad to have you join them.

Have a great day!

Your Friends at the Imaginary Application Team`);

    expect(result['ddelacroixu@bloglovin.com']).toEqual(`Dear Darius Delacroix
Welcome to imaginary application!  We're so happy you joined, and wanted
to take a moment to say hello. Our other users from Vaxholm, Sweden will
be glad to have you join them.

Have a great day!

Your Friends at the Imaginary Application Team`);
  });
});
