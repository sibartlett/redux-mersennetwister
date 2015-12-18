import Lab from 'lab';
import {expect} from 'code';
import deepFreeze from 'deep-freeze-strict'
import MersenneTwister from 'mersennetwister'
import {SEED_ACTION, GENERATE_ACTION} from './../lib/actions';
import factory from './../lib/reducer';

const lab = exports.lab = Lab.script();
const {describe, it} = lab;

describe('formats', function() {

  function formatTest(formatId, expected) {
    it(formatId, function(done) {
      let reducer = factory({ format: formatId });

      let state = undefined;

      expected.forEach(function(value) {
        state = reducer(state, {type: GENERATE_ACTION});
        expect(state.value).to.equal(value);
      });

      done();
    });
  }

  formatTest('int31', [1749605806, 290934651]);
  formatTest('real1', [0.8147236920927473, 0.13547700413863104]);
  formatTest('random', [0.8147236919030547, 0.13547700410708785]);
  formatTest('real3', [0.81472369201947, 0.13547700422350317]);
  formatTest('res53', [0.8147236863931789, 0.9057919370756192]);
  formatTest('d6', [5, 1]);

});
