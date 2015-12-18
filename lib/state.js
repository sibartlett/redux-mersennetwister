export const newState = (oldState, options) => {
  if (!options) {
    options = oldState;
    oldState = {}
  }

  return Object.assign({
    toJSON() {
      // We cache the state of the RNG in the state tree
      // This cache should not be serialized
      let obj = {};
      if (this.seed) {
        obj.seed = this.seed;
      }
      if (this.count) {
        obj.count = this.count;
      }
      if (this.values) {
        obj.values = this.values;
      }
      if (this.value) {
        obj.value = this.value;
      }
      return obj;
    }
  }, oldState, options);
};

export default {
  newState
};
