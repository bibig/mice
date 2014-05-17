
var mice = require('../index')('en');
var should = require('should');

describe('base test', function () {

  it('test word', function () {
    var s = mice.word();
    
    console.log(s);
    should(s.length > 0).be.ok;
  });


  it('test sentence', function () {
    var x = 100;
    var s;

    while(--x > 0) {
      s = mice.sentence();
      console.log(s);
      should(s.length > 0).be.ok;
    }

  });

  it('test paragraphs', function () {
    var x = 10;
    var s = mice.paragraphs(3, ['<p>', '</p>']);

    // console.log(s);
    should(s.length > 0).be.ok;
    should(s.substring(0, 3)).eql('<p>');
    should(s.substring(s.length - 4)).eql('</p>');

  });

});