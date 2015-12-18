import Lab from 'lab';
import {expect} from 'code';
import deepFreeze from 'deep-freeze-strict'
import MersenneTwister from 'mersennetwister'
import {SEED_ACTION, GENERATE_ACTION} from './../lib/actions';
import factory from './../lib/reducer';

const lab = exports.lab = Lab.script();
const {describe, it} = lab;

describe('reducer', function() {

  it('returns original state when no action', function(done) {
    let reducer = factory();
    let state = undefined;

    state = reducer(state);

    expect(state).to.deep.equal({});
    done();
  });

  it('returns original state when no valid action', function(done) {
    let reducer = factory();
    let state = undefined;

    state = reducer(state, {});

    expect(state).to.deep.equal({});
    done();
  });

  it('can be serialized', function(done) {
    let reducer = factory();
    let state = undefined;
    let seed = 1;

    let mt = new MersenneTwister(seed);
    let expected = mt.int();

    state = reducer(state, {type: SEED_ACTION, seed: seed});
    deepFreeze(state);
    state = reducer(state, {type: GENERATE_ACTION});

    expect(state.value).to.equal(expected);
    done();
  });

  it('can be reseeded', function(done) {
    let reducer = factory();
    let state = undefined;
    let seed = 1;

    let mt = new MersenneTwister(seed);
    let expected = mt.int();

    state = reducer(undefined, {type: SEED_ACTION, seed: seed});
    deepFreeze(state);
    state = reducer(state, {type: GENERATE_ACTION});
    expect(state.value).to.equal(expected);

    seed = 2;
    mt.seed(seed);
    deepFreeze(state);
    state = reducer(state, {type: SEED_ACTION, seed: seed});

    deepFreeze(state);
    expected = mt.int();
    state = reducer(state, {type: GENERATE_ACTION});
    expect(state.value).to.equal(expected);

    done();
  });

  it('can be serialized', function(done) {
    let reducer = factory();
    let state = undefined;
    let seed = 1;

    let mt = new MersenneTwister(seed);

    state = reducer(state, {type: SEED_ACTION, seed: seed});

    deepFreeze(state);
    let expected = mt.int();
    state = reducer(state, {type: GENERATE_ACTION});
    expect(state.value).to.equal(expected);

    state = JSON.parse(JSON.stringify(state));
    deepFreeze(state);
    expected = mt.int();
    state = reducer(state, {type: GENERATE_ACTION});
    expect(state.value).to.equal(expected);

    done();
  });

  it('can generate more than 1 value', function(done) {
    let reducer = factory({
      quantity: 2
    });
    let state = undefined;
    let seed = 1;

    let mt = new MersenneTwister(seed);

    state = reducer(state, {type: SEED_ACTION, seed: seed});

    deepFreeze(state);

    state = reducer(state, {type: GENERATE_ACTION});
    expect(state.values).to.deep.equal([1791095845, 4282876139]);

    done();
  });

  it('defaults to seed of 5489', function(done) {
    let reducer = factory();

    let mt = new MersenneTwister(5489);

    let expected = mt.int();
    let state = reducer(undefined, {type: GENERATE_ACTION});
    expect(state.value).to.equal(expected);

    done();
  });

  it('matches reference implementation', function(done) {
    let reducer = factory();

    for (let seed = 1; seed < 6; seed++) {
      let mt = new MersenneTwister(seed);
      let state = undefined;

      state = reducer(state, {type: SEED_ACTION, seed: seed});

      for (let i = 1; i < 100; i++) {
        deepFreeze(state);

        let expected = mt.int();
        state = reducer(state, {type: GENERATE_ACTION});
        expect(state.value).to.equal(expected);
      }
    }

    done();
  });

});
