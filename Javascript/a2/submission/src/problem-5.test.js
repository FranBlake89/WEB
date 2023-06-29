const { userUtils } = require('./solutions');

describe('Problem 5 - userUtils.updateAccessCount()', function() {
  test('userUtils should be an Object', function() {
    expect(typeof userUtils).toBe('object');
  });

  test('userUtils.updateAccessCount should be function', function() {
    expect(typeof userUtils.updateAccessCount).toBe('function');
  });

  test('userUtils.updateAccessCount should return an Array', function() {
    // Give an id that isn't in the list, should get back 0 items in our list
    let updated = userUtils.updateAccessCount(0, 1000);
    expect(Array.isArray(updated)).toBe(true);
    expect(updated.length).toBe(0);
  });

  test('userUtils.updateAccessCount should work for a single id', function() {
    let updated = userUtils.updateAccessCount(1, 41);
    expect(updated).toEqual([
      {
        id: 41,
        accessCount: 501
      }
    ]);
  });

  test('userUtils.updateAccessCount should work for an Array of ids', function() {
    let updated = userUtils.updateAccessCount(1, [42, 43]);
    expect(updated).toEqual([
      {
        id: 42,
        accessCount: 443
      },
      {
        id: 43,
        accessCount: 603
      }
    ]);
  });

  test('userUtils.updateAccessCount should work with amounts other than 1', function() {
    let updated = userUtils.updateAccessCount(10, [52, 53, 75]);
    expect(updated).toEqual([
      {
        id: 52,
        accessCount: 612
      },
      {
        id: 53,
        accessCount: 695
      },
      {
        id: 75,
        accessCount: 239
      }
    ]);
  });
});
