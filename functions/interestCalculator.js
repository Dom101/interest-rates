import { getInterestRate } from '../libs/interestRates';

// TODO move response to helper lib
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

function createResponse(error, body) {
  return {
    statusCode: error ? 500 : 200,
    headers: headers,
    body: JSON.stringify(body),
  };
}

/**
 * @description Interest calculate event handler
 *
 * @typedef InterestRateCalculatorResponseValue {object}
 * @property {string} openingBalance
 * @property {boolean} interestEarned
 * @property {boolean} newBalance
 *
 * @param {object} event
 * @param {object} event.queryStringParameters
 *
 */
export async function calculate(event) {
  console.log('Calculate -> event', event);
  let data;

  data = event.queryStringParameters;
  console.log('TCL: calculate -> data', data);

  if (!data.balance) {
    return createResponse(true, 'Balance is required');
  }

  if (isNaN(data.balance)) {
    return createResponse(true, 'Balance must be a number');
  }

  const openingBalance = Number(data.balance);

  if (openingBalance < 0) {
    return createResponse(true, 'Balance must be a positive number');
  }

  const interestRate = getInterestRate(openingBalance);

  const interestEarned = openingBalance * interestRate;

  const newBalance = openingBalance + interestEarned;

  return createResponse(false, {
    openingBalance: openingBalance.toFixed(2),
    interestEarned: interestEarned.toFixed(2),
    newBalance: newBalance.toFixed(2),
  });
};
