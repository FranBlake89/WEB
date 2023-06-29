const { firstCountry } = require('./solutions');

describe('Problem 0 - firstCountry() function', function() {
  test('firstCountry() should return the correct country name', function() {
    /**
     * Take a look at the file src/users.json.  The first Object in the Array
     * looks like this:
     *
     * {
     *   "id": 1,
     *   "name": {
     *     "first": "Paige",
     *     "last": "Bools"
     *   },
     *   "birthDate": "1995-02-04T07:34:45Z",
     *   "contact": {
     *     "phone": "8989068955",
     *     "email": "pbools0@webmd.com"
     *   },
     *   "address": {
     *     "street": "476 Veith Parkway",
     *     "city": "Cuamba",
     *     "country": "Mozambique"
     *   },
     *   "accessCount": 776,
     *   "isManager": false
     * },
     *
     * Notice that the country is Mozambique.  That's what our test
     * expects to receive here.
     */

    expect(firstCountry()).toBe('Mozambique');
  });
});
