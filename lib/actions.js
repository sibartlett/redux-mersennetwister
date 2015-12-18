export const SEED_ACTION = 'MERSENNE_TWISTER_SEED';
export const GENERATE_ACTION = 'MERSENNE_TWISTER_GENERATE';

export const seed = (seed) => {
  return {
    type: SEED_ACTION,
    seed: seed || (Date.now() >>> 0)
  };
};

export const generate = () => {
  return {
    type: GENERATE_ACTION
  };
};

export default {
  SEED_ACTION,
  GENERATE_ACTION,
  seed,
  generate
};
