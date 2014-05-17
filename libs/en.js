
exports.word       = word;
exports.words      = words;

exports.sentence   = sentence;
exports.sentences  = sentences;

exports.paragraph  = paragraph;
exports.paragraphs = paragraphs;

var utils = require('./utils');
var words_list = [
  'alias', 'consequatur', 'aut', 'perferendis', 'sit', 'voluptatem',
  'accusantium', 'doloremque', 'aperiam', 'eaque','ipsa', 'quae', 'ab',
  'illo', 'inventore', 'veritatis', 'et', 'quasi', 'architecto',
  'beatae', 'vitae', 'dicta', 'sunt', 'explicabo', 'aspernatur', 'aut',
  'odit', 'aut', 'fugit', 'sed', 'quia', 'consequuntur', 'magni',
  'dolores', 'eos', 'qui', 'ratione', 'voluptatem', 'sequi', 'nesciunt',
  'neque', 'dolorem', 'ipsum', 'quia', 'dolor', 'sit', 'amet',
  'consectetur', 'adipisci', 'velit', 'sed', 'quia', 'non', 'numquam',
  'eius', 'modi', 'tempora', 'incidunt', 'ut', 'labore', 'et', 'dolore',
  'magnam', 'aliquam', 'quaerat', 'voluptatem', 'ut', 'enim', 'ad',
  'minima', 'veniam', 'quis', 'nostrum', 'exercitationem', 'ullam',
  'corporis', 'nemo', 'enim', 'ipsam', 'voluptatem', 'quia', 'voluptas',
  'sit', 'suscipit', 'laboriosam', 'nisi', 'ut', 'aliquid', 'ex', 'ea',
  'commodi', 'consequatur', 'quis', 'autem', 'vel', 'eum', 'iure',
  'reprehenderit', 'qui', 'in', 'ea', 'voluptate', 'velit', 'esse',
  'quam', 'nihil', 'molestiae', 'et', 'iusto', 'odio', 'dignissimos',
  'ducimus', 'qui', 'blanditiis', 'praesentium', 'laudantium', 'totam',
  'rem', 'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos',
  'dolores', 'et', 'quas', 'molestias', 'excepturi', 'sint',
  'occaecati', 'cupiditate', 'non', 'provident', 'sed', 'ut',
  'perspiciatis', 'unde', 'omnis', 'iste', 'natus', 'error',
  'similique', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt',
  'mollitia', 'animi', 'id', 'est', 'laborum', 'et', 'dolorum', 'fuga',
  'et', 'harum', 'quidem', 'rerum', 'facilis', 'est', 'et', 'expedita',
  'distinctio', 'nam', 'libero', 'tempore', 'cum', 'soluta', 'nobis',
  'est', 'eligendi', 'optio', 'cumque', 'nihil', 'impedit', 'quo',
  'porro', 'quisquam', 'est', 'qui', 'minus', 'id', 'quod', 'maxime',
  'placeat', 'facere', 'possimus', 'omnis', 'voluptas', 'assumenda',
  'est', 'omnis', 'dolor', 'repellendus', 'temporibus', 'autem',
  'quibusdam', 'et', 'aut', 'consequatur', 'vel', 'illum', 'qui',
  'dolorem', 'eum', 'fugiat', 'quo', 'voluptas', 'nulla', 'pariatur',
  'at', 'vero', 'eos', 'et', 'accusamus', 'officiis', 'debitis', 'aut',
  'rerum', 'necessitatibus', 'saepe', 'eveniet', 'ut', 'et',
  'voluptates', 'repudiandae', 'sint', 'et', 'molestiae', 'non',
  'recusandae', 'itaque', 'earum', 'rerum', 'hic', 'tenetur', 'a',
  'sapiente', 'delectus', 'ut', 'aut', 'reiciendis', 'voluptatibus',
  'maiores', 'doloribus', 'asperiores', 'repellat'
];

function first_letter_up (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function word () {
  return words_list[utils.pickup(words_list.length) - 1];
}

function words (n, glue) {
  var arr = [];
  var puncs = {
    5   : ["''", '""', '()', '《》', '[]', '<>'],
    100 : ''
  };
  var punc, str;
  n = n || 2;

  do {
    arr.push(word());
  } while ( --n > 0);

  str =  utils.join(arr, glue || ' ');
  punc = utils.pickup_by_probability(puncs);

  if (punc.length == 2) {
    return punc[0] + str + punc[1];
  }

  return str;
}

function sentence () {
  var endPuncs = {
    10: [';', '?', '!', '...'],
    100: '.'
  };

  var glues = {
    10: ["'s", ': ', '-', '~ ', ' —— '],
    100: ', '
  };

  var num = utils.pickup(4);
  var members = [];

  do {
    members.push(words(utils.between(2, 15)));
  } while (--num > 0);

  // console.log(members);

  return first_letter_up(members.join(utils.pickup_by_probability(glues))) + utils.pickup_by_probability(endPuncs);
}

function sentences (n, glue) {
  var arr = [];
  n = n || 2;

  do {
    arr.push(sentence());
  } while (--n > 0);

  return utils.join(arr, glue);
}

function paragraph () {
  return sentences(utils.between(3, 10));
}

function paragraphs (n, glue) {
  var arr = [];
  n = n || 2;

  do {
    arr.push(paragraph());
  } while ( --n > 0);

  return utils.join(arr, glue);
}
