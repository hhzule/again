import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamoDB from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';
import * as appsync from '@aws-cdk/aws-appsync';

export class WeatherAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // This is the DynamoDB Table
    const weather = new dynamoDB.Table(this, 'weather', {
      billingMode: dynamoDB.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'id', type: dynamoDB.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    // This is the Graph QL lambda
    const graphqlLambda = new lambda.Function(this, 'graphqlLambda', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: { dynamoDBTable: weather.tableName }
    })

    // Access for DynamoDB Table to GraphQL Lambda
    weather.grantFullAccess(graphqlLambda)

    // Access for GraphQL Lambda to DynamoDB
    graphqlLambda.addToRolePolicy(new iam.PolicyStatement({
      resources: ['*'],
      actions: ['dynamodb:*']
    }))

    // This is AWS App Sync
    const weatherGraphQLAPI = new appsync.GraphqlApi(this, 'weatherGraphQLAPI', {
      name: 'weatherGraphQLAPI',
      schema: appsync.Schema.fromAsset('graphql/schema.gql')
    })

    // Connect weatherGraphQLAPI to graphqlLambda
    const lambdaDataSource = weatherGraphQLAPI.addLambdaDataSource( 'lambdaDataSource', graphqlLambda)

    // Resolver to get weather for 1 zipcode
    lambdaDataSource.createResolver({
      typeName: 'Query',
      fieldName: 'getCurrent'
    })

    // Resolver to get all weather data for 1 zipcode
    lambdaDataSource.createResolver({
      typeName: 'Query',
      fieldName: 'getAll'
    })

    // Output the API URL
    new cdk.CfnOutput(this, 'graphQLAPI', {
      value: weatherGraphQLAPI.graphqlUrl
    })

  }
}
