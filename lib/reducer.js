import {SEED_ACTION, GENERATE_ACTION} from './actions';
import formats from './formats';
import generate from './mersenne-twister';
import {newState} from './state';

export default (options = {}) => {

  options = Object.assign({
    seed_action: SEED_ACTION,
    generate_action: GENERATE_ACTION,
    quantity: 1,
    format: 'int32'
  }, options);

  return (state = {}, action) => {
    if (!action) {
      return state;
    }

    switch (action.type) {

    case options.seed_action:
      return newState({seed:action.seed});

    case options.generate_action:
      return generate(state, options);
    }

    return state;
  };
};
