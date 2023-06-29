const { userUtils } = require('./solutions');

describe('Problem 4 - userUtils.getProfiles()', function() {
  test('userUtils should be an Object', function() {
    expect(typeof userUtils).toBe('object');
  });

  test('userUtils.getProfiles should be function', function() {
    expect(typeof userUtils.getOldestUser).toBe('function');
  });

  test('userUtils.getProfiles should return an Array', function() {
    let profiles = userUtils.getProfiles(100, 100);
    expect(Array.isArray(profiles)).toBe(true);
    expect(profiles.length).toBe(150);
  });

  test('userUtils.getProfiles Array should have correct properties', function() {
    let profile0 = userUtils.getProfiles(100, 100)[0];
    expect(typeof profile0).toBe('object');
    expect(typeof profile0.id).toBe('number');
    expect(typeof profile0.email).toBe('string');
    expect(typeof profile0.image).toBe('string');
  });

  test('userUtils.getProfiles profile data should be correct', function() {
    let profiles = userUtils.getProfiles(100, 100);

    expect(profiles[0]).toEqual({
      id: 1,
      email: 'Paige Bools <pbools0@webmd.com>',
      image: 'https://faces.com/user/1?width=100&height=100'
    });
    expect(profiles[149]).toEqual({
      id: 150,
      email: 'Elyse Bullick <ebullick45@boston.com>',
      image: 'https://faces.com/user/150?width=100&height=100'
    });
  });

  test('userUtils.getProfiles profile data should use width and height values', function() {
    let profiles = userUtils.getProfiles(320, 256);

    expect(profiles[0]).toEqual({
      id: 1,
      email: 'Paige Bools <pbools0@webmd.com>',
      image: 'https://faces.com/user/1?width=320&height=256'
    });
  });

  test('userUtils.getProfiles profile data should re-use width for missing height', function() {
    let profiles = userUtils.getProfiles(555);

    expect(profiles[0]).toEqual({
      id: 1,
      email: 'Paige Bools <pbools0@webmd.com>',
      image: 'https://faces.com/user/1?width=555&height=555'
    });
  });
});
