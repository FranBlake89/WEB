const { userUtils } = require('./solutions');

describe('Problem 3 - userUtils.getOldestUser()', function() {
  test('userUtils should be an Object', function() {
    expect(typeof userUtils).toBe('object');
  });

  test('userUtils.getOldestUser should be function', function() {
    expect(typeof userUtils.getOldestUser).toBe('function');
  });

  test('userUtils.getOldestUser() should return a user Object', function() {
    let oldestUser = userUtils.getOldestUser();

    expect(typeof oldestUser.id).toBe('number');
    expect(typeof oldestUser.name.first).toBe('string');
    expect(typeof oldestUser.name.last).toBe('string');
    expect(typeof oldestUser.birthDate).toBe('string');
    expect(typeof oldestUser.contact.phone).toBe('string');
    expect(typeof oldestUser.contact.email).toBe('string');
    expect(typeof oldestUser.contact.phone).toBe('string');
    expect(typeof oldestUser.address.street).toBe('string');
    expect(typeof oldestUser.address.city).toBe('string');
    expect(typeof oldestUser.address.country).toBe('string');
    expect(typeof oldestUser.accessCount).toBe('number');
    expect(typeof oldestUser.isManager).toBe('boolean');
  });

  test('userUtils.getOldestUser() should return the oldest user', function() {
    let oldestUser = userUtils.getOldestUser();

    // user id=42 (Elwira Goroni born in 1980)
    expect(oldestUser.id).toBe(42);
  });
});
