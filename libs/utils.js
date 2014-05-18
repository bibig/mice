exports.between               = between;
exports.pickup                = pickup;
exports.pickup_by_probability = pickup_by_probability;
exports.join                  = join;

/**
 * [between]
 * return a number between the given range
 * 
 * @author bibig@me.com
 * @update [2014-05-18 09:38:14]
 * @param  {int} min
 * @param  {int} max
 * @return {int}
 */
function between (min, max) {
  return min + pickup(max - min);
}


/**
 * [pickup]
 * return a number not greater than the limit
 * 
 * @author bibig@me.com
 * @update [2014-05-18 09:39:35]
 * @param  {int} v [the limit or the max]
 * @return {int}
 */
function pickup (v) {
  if (typeof v === 'number') {
    return Math.ceil( Math.random() * v);
  } else {
    return pickup_by_probability(v);
  }
}

/**
 * [pickup_by_probability]
 * 
 * return a value in the hash according to the key which defined as the probability 
 *
 * eg:
 * obj: {
 *   5: '%5',
 *   10: '%5 too',
 *   90: '80%',
 *   100: '10%'
 * }
 *  
 * 
 * @author bibig@me.com
 * @update [2014-05-18 09:40:38]
 * @param  {object} obj
 * @return {object value}    
 */
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

/**
 * [join array]
 *
 *  join an array into string by the glue, 
 *  if the glue is an array, 
 *  the first item will be taken as the start tag, 
 *  and the second item will be the end tag.
 *
 * eg:
 * join([...], '<br>')
 * join([...], ['<p>', '</p>'])
 * 
 * @author bibig@me.com
 * @update [2014-05-18 09:46:33]
 * @param  {array} list
 * @param  {string or array} glue
 * @return {string}
 */
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