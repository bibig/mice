exports.between               = between;
exports.pickup                = pickup;
exports.pickup_by_probability = pickup_by_probability;
exports.join                  = join;

function between (min, max) {
  return min + pickup(max - min);
}

function pickup (v) {
  if (typeof v === 'number') {
    return Math.ceil( Math.random() * v);
  } else {
    return pickup_by_probability(v);
  }
}

function pickup_by_probability (obj) {
  var pos, keys, i, v;

  if ( typeof obj !== 'object') { return null; }

  pos = pickup(100);
  keys = Object.keys(obj);

  for (i = 0; i < keys.length; i++) {
    if (keys[i] >= pos) {
      v = obj[keys[i]];

      if (Array.isArray(v)) {
        return v[pickup(v.length) -1];
      } else {
        return v;
      }

    }
  }
  throw new Error('cannot find value of pos: ' + pos);
}

function join (list, glue) {
  var s = '';

  glue = glue || '';

  if (Array.isArray(glue)) {
    list.forEach(function (item) {
      s += glue[0] + item + glue[1];
    });

    return s;
  } 
  
  return list.join(glue);
}