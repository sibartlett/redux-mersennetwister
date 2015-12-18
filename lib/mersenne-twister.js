import formats from './formats';
import {newState} from './state';

const MAX_INT = 4294967296.0;
const N = 624;
const M = 397;
const UPPER_MASK = 0x80000000;
const LOWER_MASK = 0x7fffffff;
const MATRIX_A = 0x9908b0df;

const initmt = (state) => {
  return newState(state, {
    mt: new Array(N),
    mti: N + 1,
    count: 0,
    seed: state.seed || 5489
  });
};

const seedmt = (state) => {
  let mt = state.mt.slice(0);
  let mti = state.mti;

  mt[0] = state.seed;

  for (let mti = 1; mti < N; mti++) {
    let s = mt[mti - 1] ^ (mt[mti - 1] >>> 30);
    mt[mti] =
      (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + mti;
    mt[mti] >>>= 0;
  }

  return newState(state, {
    mt: mt,
    mti: mti
  });
};

const twist = (state, options) => {
  let mt = state.mt.slice(0);
  let mti = state.mti;

  let generate = () => {

    let y;
    let kk;
    let mag01 = new Array(0, MATRIX_A);

    if (mti >= N) {

      for (kk = 0; kk < N - M; kk++) {
        y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
        mt[kk] = mt[kk + M] ^ (y >>> 1) ^ mag01[y & 1];
      }

      for (; kk < N - 1; kk++) {
        y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
        mt[kk] = mt[kk + (M - N)] ^ (y >>> 1) ^ mag01[y & 1];
      }

      y = (mt[N - 1] & UPPER_MASK) | (mt[0] & LOWER_MASK);
      mt[N - 1] = mt[M - 1] ^ (y >>> 1) ^ mag01[y & 1];
      mti = 0;
    }

    y = mt[mti++];

    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);

    return y >>> 0;
  }

  let values = [];
  let format = formats[options.format]

  for (let i = 0; i < options.quantity; i++) {
    values.push(
      format(generate, options)
    );
  }

  return newState(state, {
    mt: mt,
    mti: mti,
    count: 1 + (state.count || 0),
    values: values,
    value: values.length == 1 ? values[0] : undefined
  });
};


export default (state, options) => {
  if (!state.mt) {
    let count = state.count || 0;
    state = initmt(state);
    state = seedmt(state);

    for (let i = 0; i < count; i++) {
      state = twist(state, options);
    }
  }

  return twist(state, options);
};
