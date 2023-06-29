const { userUtils } = require('./solutions');

describe('Problem 6 - userUtils.search.byName()', function() {
  test('userUtils should be an Object', function() {
    expect(typeof userUtils).toBe('object');
  });

  test('userUtils.search should be an Object', function() {
    expect(typeof userUtils.search).toBe('object');
  });

  test('userUtils.search.byName should be function', function() {
    expect(typeof userUtils.search.byName).toBe('function');
  });

  test('userUtils.search.byName should return an Array', function() {
    let results = userUtils.search.byName('Paige');
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(1);
  });

  test('userUtils.search.byName should work for firstname exact searches', function() {
    let results = userUtils.search.byName('Drake');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe(3);
    expect(results[0].name.first).toBe('Drake');
    expect(results[0].name.last).toBe('Arundale');
  });

  test('userUtils.search.byName should work for lastname exact searches', function() {
    let results = userUtils.search.byName('Arundale');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe(3);
    expect(results[0].name.first).toBe('Drake');
    expect(results[0].name.last).toBe('Arundale');
  });

  test('userUtils.search.byName should work for firstname fuzzy searches', function() {
    let results = userUtils.search.byName('Dr', true);
    expect(results.length).toBe(1);
    expect(results[0].id).toBe(3);
    expect(results[0].name.first).toBe('Drake');
    expect(results[0].name.last).toBe('Arundale');
  });

  test('userUtils.search.byName should work for firstname fuzzy searches with lowercase', function() {
    let results = userUtils.search.byName('dra', true);
    expect(results.length).toBe(1);
    expect(results[0].id).toBe(3);
    expect(results[0].name.first).toBe('Drake');
    expect(results[0].name.last).toBe('Arundale');
  });

  test('userUtils.search.byName should work for lastname fuzzy searches', function() {
    let results = userUtils.search.byName('Ar', true);
    expect(results.length).toBe(3);
    expect(results[0].id).toBe(3);
    expect(results[0].name.first).toBe('Drake');
    expect(results[0].name.last).toBe('Arundale');

    expect(results[1].id).toBe(82);
    expect(results[1].name.first).toBe('Archy');
    expect(results[1].name.last).toBe('Lechelle');

    expect(results[2].id).toBe(105);
    expect(results[2].name.first).toBe('Caresse');
    expect(results[2].name.last).toBe('Arniz');
  });

  test('userUtils.search.byName should work for lastname fuzzy searches with lowercase', function() {
    let results = userUtils.search.byName('aR', true);
    expect(results.length).toBe(3);
    expect(results[0].id).toBe(3);
    expect(results[0].name.first).toBe('Drake');
    expect(results[0].name.last).toBe('Arundale');

    expect(results[1].id).toBe(82);
    expect(results[1].name.first).toBe('Archy');
    expect(results[1].name.last).toBe('Lechelle');

    expect(results[2].id).toBe(105);
    expect(results[2].name.first).toBe('Caresse');
    expect(results[2].name.last).toBe('Arniz');
  });
});
