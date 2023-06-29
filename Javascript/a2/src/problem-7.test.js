const { userUtils } = require('./solutions');

describe('Problem 7 - userUtils.search.byCountry()', function() {
  test('userUtils should be an Object', function() {
    expect(typeof userUtils).toBe('object');
  });

  test('userUtils.search should be an Object', function() {
    expect(typeof userUtils.search).toBe('object');
  });

  test('userUtils.search.byCountry should be function', function() {
    expect(typeof userUtils.search.byCountry).toBe('function');
  });

  test('userUtils.search.byCountry should return an Array', function() {
    let results = userUtils.search.byCountry('Nowhere');
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(0);
  });

  test('userUtils.search.byCountry should work for one country', function() {
    let results = userUtils.search.byCountry('China');
    expect(results.length).toBe(29);
    results.forEach(result => expect(result.address.country).toBe('China'));
  });

  test('userUtils.search.byCountry should work for multiple countries', function() {
    let chinaResults = userUtils.search.byCountry('China');
    expect(chinaResults.length).toBe(29);
    chinaResults.forEach(result => expect(result.address.country).toBe('China'));

    let canadaResults = userUtils.search.byCountry('Canada');
    expect(canadaResults.length).toBe(3);
    canadaResults.forEach(result => expect(result.address.country).toBe('Canada'));

    const compare = (a, b) => b.id - a.id;

    let results = userUtils.search.byCountry('China', 'Canada');
    expect(results.sort(compare)).toEqual(chinaResults.concat(canadaResults).sort(compare));
  });
});
