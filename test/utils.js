var utils = require('../libs/utils');
var should = require('should');

describe('utils unit test', function () {

  it('test pickup', function () {
    var x = 100000;
    var results = {};
    var v;

    while (--x > 0) {
      v = utils.pickup(10) + '';
      
      if ( !results[v] ) {
        results[v] = 1;
      } else {
        results[v]++;
      }
      
    }

    // console.log(results);

    Object.keys(results).forEach(function (v) {
      should(results[v] > 9500).be.ok;
    });

    should(Object.keys(results).length).eql(10);

  });

  it('test pickup_by_probability', function () {
    var glues = {
      10: '!',
      100: '?'
    };
    var results = {'!': 0, '?': 0};
    var x = 10000;

    while(--x > 0) {
      results[utils.pickup_by_probability(glues)]++;
    }

    // console.log(results);

    (results['!']> 900 && results['!'] < 1100).should.be.true;
    (results['?']> 8900 && results['!'] < 9100).should.be.true;


  });

});