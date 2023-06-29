const { userUtils } = require('./solutions');

describe('Problem 2 - userUtils.getManagers()', function() {
  test('userUtils should be an Object', function() {
    expect(typeof userUtils).toBe('object');
  });

  test('userUtils.getManagers should be function', function() {
    expect(typeof userUtils.getManagers).toBe('function');
  });

  test('userUtils.getManagers() should return a proper Array', function() {
    let managers = userUtils.getManagers();
    expect(Array.isArray(managers)).toBe(true);
    expect(managers.length).toBe(69);
  });

  test('userUtils.getManagers() should only contain Manger users', function() {
    let managers = userUtils.getManagers();

    managers.forEach(manager => {
      // First, check the isManager property
      expect(typeof manager.isManager).toBe('boolean');
      expect(manager.isManager).toBe(true);

      // Second, check that all the other user properties are here too
      expect(typeof manager.id).toBe('number');
      expect(typeof manager.name.first).toBe('string');
      expect(typeof manager.name.last).toBe('string');
      expect(typeof manager.birthDate).toBe('string');
      expect(typeof manager.contact.phone).toBe('string');
      expect(typeof manager.contact.email).toBe('string');
      expect(typeof manager.contact.phone).toBe('string');
      expect(typeof manager.address.street).toBe('string');
      expect(typeof manager.address.city).toBe('string');
      expect(typeof manager.address.country).toBe('string');
      expect(typeof manager.accessCount).toBe('number');
    });
  });
});
