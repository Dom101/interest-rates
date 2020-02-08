// Stored sepratley as these are likely to update
// Future update to read from an external source

const interestRates = {
  '<1000': 0.01,
  '<5000': 0.015,
  '<10000': 0.02,
  '<50000': 0.025,
  '>50000': 0.03,
};

export function getInterestRate(balance) {
  if (balance < 1000) {
    return interestRates['<1000'];
  }

  if (balance < 5000) {
    return interestRates['<5000'];
  }

  if (balance < 10000) {
    return interestRates['<10000'];
  }

  if (balance < 50000) {
    return interestRates['<50000'];
  }

  return interestRates['>50000'];
}

