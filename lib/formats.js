// 9007199254740992 (2^53) is the max integer number in JavaScript
// See: http://vq.io/132sa2j
const MAX_INT = 9007199254740992;
const MIN_INT = -MAX_INT;

export const int32 = (rng) => {
  return rng();
};

export const int31 = (rng) => {
  return rng() >>> 1;
};

export const real1 = (rng) => {
  return rng() * (1.0 / 4294967295.0);
  /* divided by 2^32-1 */
};

/* generates a random number on [0,1)-real-interval */
export const random = (rng) => {
  return rng() * (1.0 / 4294967296.0);
  /* divided by 2^32 */
};

/* generates a random number on (0,1)-real-interval */
export const real3 = (rng) => {
  return (rng() + 0.5) * (1.0 / 4294967296.0);
  /* divided by 2^32 */
};

/* generates a random number on [0,1) with 53-bit resolution*/
export const res53 = (rng) => {
  var a = rng()>>>5, b = rng()>>>6;
  return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
};

export const integer = (rng, options) => {
  options = Object.assign({min: MIN_INT, max: MAX_INT}, options);
  return Math.floor(
    random(rng) * (options.max - options.min + 1) + options.min
  );
};

export const natural = (rng, options) => {
  options = Object.assign({min: 0, max: MAX_INT}, options);
  return integer(rng, options);
};

const diceFn = (range) => {
  return (rng, options) => {
    return natural(rng, range);
  };
}

export const d4 = diceFn({min: 1, max: 4});
export const d6 = diceFn({min: 1, max: 6});
export const d8 = diceFn({min: 1, max: 8});
export const d10 = diceFn({min: 1, max: 10});
export const d12 = diceFn({min: 1, max: 12});
export const d20 = diceFn({min: 1, max: 20});
export const d30 = diceFn({min: 1, max: 30});
export const d100 = diceFn({min: 1, max: 100});

export default {
  int32,
  int31,
  real1,
  random,
  real3,
  res53,
  integer,
  natural,
  d4,
  d6,
  d8,
  d10,
  d12,
  d20,
  d30,
  d100,
};
