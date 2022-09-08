// @flow

const {randomIn, normalIn} = require('bens_utils').stochastic;

// function to potentially initialize with randomized values
const IS_RANDOMIZED = true;

const val = (base, min, max, isNormal) => {
  if (!IS_RANDOMIZED) return base;
  // handle floats between 0 and 1
  let mult = 1;
  if ((min > 0 && min < 1) || (max > 0 && max <= 1)) {
    mult = 100;
  }
  if (isNormal) {
    return normalIn(min * mult, max * mult) / mult;
  }
  return randomIn(min * mult, max * mult) / mult;
};


const config = {
  isRandomized: IS_RANDOMIZED,
  msPerTick: 1000,
  maxTickerLength: 7,

  capital: 1000000,

  factions: {
    ['Corporations']: {
      name: 'Corporations',
      wealth: 500000,
      taxRate: val(0.2, 0, 0.5),
      subsidy: val(0, 0, 50000),
      population: val(50, 1, 100, true),
      favorability: val(50, 1, 100, true),
      props: {
        production: val(10, 1, 50, true), // value multiplier for each corp
      },
    },

    ['Middle Class']: {
      name: 'Middle Class',
      wealth: 50000,
      taxRate: val(0.4, 0, 0.7),
      subsidy: val(0, 0, 5000),
      population: val(1000, 100, 10000),
      favorability: val(50, 1, 100, true),
      props: {
        unemployment: val(0.1, 0, 0.8), // rate of not employed
        wage: val(10, 2, 30, true), // wage going to each employed person
        skill: val(5, 1, 10), // how much more productive than working class each employed person is
        consumerism: val(0.5, 0.1, 0.99), // how much wealth goes to buying things
      },
    },

    ['Working Class']: {
      name: 'Working Class',
      wealth: val(0, 0, 10000),
      taxRate: val(0.3, 0, 0.7),
      subsidy: val(0, 0, 5000),
      population: val(10000, 1000, 50000),
      favorability: val(50, 1, 100, true),
      props: {
        unemployment: val(0.1, 0, 0.9), // rate of not employed
        wage: val(3, 1, 6), // wage going to each employed person
        consumerism: val(0.9, 0.1, 0.99) // how much wealth goes to buying things
      },
    },

    // Intelligentsia -- produce production and skill gains (+ subsidy)

    // Military -- cost money for upkeep (subsidy)

    // Landowners -- produce food, charge rent
  },
};


module.exports = {
  config,
};
