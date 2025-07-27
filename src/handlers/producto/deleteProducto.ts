import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient, DeleteItemCommand } from '@aws-sdk/client-dynamodb';

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

    const params = {
      TableName: process.env.TABLENAME,
      Key: {
        productoId: { S: id }
      }
    };

    await client.send(new DeleteItemCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Producto eliminado' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al eliminar producto', error: err })
    };
  }
};
