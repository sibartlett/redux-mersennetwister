# redux-mersennetwister

A redux reducer that generates pseudo random numbers using the [Mersenne Twister algorithm](https://en.wikipedia.org/wiki/Mersenne_Twister).

### Example usage

```js
import { combineReducers, createStore } from 'redux'
import mersennetwister from 'redux-mersennetwister'

const myReducer = combineReducers({
  gameDice: mersennetwister({
    format: 'd6',
    quantity: 2
  })
});

let store = createStore(myReducer);

store.dispatch({
  type: 'MERSENNE_TWISTER_SEED',
  seed: 42 // Optional seed value, defaults to Date.now()
});

console.log(store.getState())

// {
//   gameDice: {
//     seed: 42
//   }
// }

store.dispatch({
  type: 'MERSENNE_TWISTER_GENERATE'
});

console.log(store.getState())

// {
//   gameDice: {
//     seed: 42,
//     count: 1,
//     values: [3, 5]
//   }
// }

store.dispatch({
  type: 'MERSENNE_TWISTER_GENERATE'
});

console.log(store.getState())

// {
//   gameDice: {
//     seed: 42,
//     count: 2,
//     values: [6, 2]
//   }
// }
```
