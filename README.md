# interest-rates

### Basic Interest Calculator

This is an interest rate calculator deployed using the Serverless framework on AWS.
It has a NodeJs lambda function to calculate interest payable given a balance. 
This is connected to an API gateway which will call the lambda when the route /interest is called

### Usage
The api has a single route **/interest** which accepts GET requests with the query string parameter **balance**\
e.g. `https://9oxozo5rw6.execute-api.eu-west-1.amazonaws.com/dev/interest?balance=500`\
*This is a working URL feel free to try it* :point_up:    

This will return the opening balance, interest earned and the new balance in JSON format
```json
{
  "openingBalance": "500.00",
  "interestEarned": "5.00",
  "newBalance": "505.00"
}
```
The interest rates are calculated using the following data

| Balance        | Interest     |
| :----------:  |:-------------:|
| <1000     | 1% |
| <5000     | 1.5% |
| <10000     | 2% |
| <50000     | 2.5% |
| >50000     | 3% |

The balance must be a positive number

## Running Locally & Deploying

### Prerequisites

Before you start, you will need:
* [Node.js and Node Package Manager (NPM)](https://nodejs.org/download/)
* [Serverless](https://github.com/serverless/serverless)
* [Yarn](https://classic.yarnpkg.com/en/docs/install)

### Steps to run locally

1. Install the dependencies
```bash
$ yarn
```

2. Run the server in offline mode
```bash
$ yarn start
```

3. The server will now be running check the output for the url

### Steps to deploy

1. Install the dependencies
```bash
$ yarn
```

2. Deploy project to given stage (default is dev)
```bash
$ serverless deploy --stage ${STAGE}
```

3. Serverless will now create/update the cloudformation template and deploy to the given stage


### Possible Improvements
- Improve handling of possible rounding errors
- Add authentication to secure routes
- Load current interest rates from S3 
- Store data in DynamoDB
- Add CI workflow to test, build and deploy
- Add multiple environments and branches
