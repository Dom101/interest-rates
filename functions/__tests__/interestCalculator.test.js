import { calculate } from '../interestCalculator';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

test('When the body does not contain balance', async () => {
  const queryStringParameters = { test: true }
  const event = { queryStringParameters };

  const response = await calculate(event);

  const expectedResponse = {
    statusCode: 500,
    headers: headers,
    body: JSON.stringify('Balance is required'),
  }

  expect(response).toEqual(expectedResponse);
});

test('When the balance is not a number', async () => {
  const queryStringParameters = { balance: '42px' }
  const event = { queryStringParameters };

  const response = await calculate(event);

  const expectedResponse = {
    statusCode: 500,
    headers: headers,
    body: JSON.stringify('Balance must be a number'),
  };

  expect(response).toEqual(expectedResponse);
});

test('When the balance is not a positive number', async () => {
  const queryStringParameters = { balance: -50000 }
  const event = { queryStringParameters };

  const response = await calculate(event);

  const expectedResponse = {
    statusCode: 500,
    headers: headers,
    body: JSON.stringify('Balance must be a positive number'),
  };

  expect(response).toEqual(expectedResponse);
});

test('When the balance is less than 1000', async () => {
  const queryStringParameters = { balance: 496.54 }
  const event = { queryStringParameters };

  const response = await calculate(event);

  const expectedResult = {
    openingBalance: '496.54',
    interestEarned: '4.97',
    newBalance: '501.51'
  };

  const expectedResponse = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(expectedResult),
  };

  expect(response).toEqual(expectedResponse);
});

test('When the balance is less than 5000', async () => {
  const queryStringParameters = { balance: 4000.00 }
  const event = { queryStringParameters };

  const response = await calculate(event);

  const expectedResult = {
    openingBalance: '4000.00',
    interestEarned: '60.00',
    newBalance: '4060.00',
  };

  const expectedResponse = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(expectedResult),
  };

  expect(response).toEqual(expectedResponse);
});

test('When the balance is less than 10000', async () => {
  const queryStringParameters = { balance: '9999.99' }
  const event = { queryStringParameters };

  const response = await calculate(event);

  const expectedResult = {
    openingBalance: '9999.99',
    interestEarned: '200.00',
    newBalance: '10199.99',
  };

  const expectedResponse = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(expectedResult),
  };

  expect(response).toEqual(expectedResponse);
});

test('When the balance is less than 50000', async () => {
  const queryStringParameters = { balance: '23131.02' }
  const event = { queryStringParameters };

  const response = await calculate(event);

  const expectedResult = {
    openingBalance: '23131.02',
    interestEarned: '578.28',
    newBalance: '23709.30',
  };

  const expectedResponse = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(expectedResult),
  };

  expect(response).toEqual(expectedResponse);
});

test('When the balance is greater than 50000', async () => {
  const queryStringParameters = { balance: '100000.00' }
  const event = { queryStringParameters };

  const response = await calculate(event);

  const expectedResult = {
    openingBalance: '100000.00',
    interestEarned: '3000.00',
    newBalance: '103000.00',
  };

  const expectedResponse = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(expectedResult),
  };

  expect(response).toEqual(expectedResponse);
});