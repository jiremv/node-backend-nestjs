import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');

    const params = {
      TableName: process.env.TABLENAME,
      Item: {
        productoId: { S: body.productoId },
        nombre: { S: body.nombre },
        categoria: { S: body.categoria },
        precio: { N: body.precio.toString() },
        fechaCreacion: { S: body.fechaCreacion }
      }
    };

    await client.send(new PutItemCommand(params));

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Producto creado correctamente' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al crear el producto', error: err })
    };
  }
};
