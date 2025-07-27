import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Falta el ID del producto' })
      };
    }

    const data = await client.send(new GetItemCommand({
      TableName: process.env.TABLENAME,
      Key: { productoId: { S: id } }
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(data.Item)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al buscar producto', error: err })
    };
  }
};
