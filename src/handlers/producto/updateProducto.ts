import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');

    const params = {
      TableName: process.env.TABLENAME,
      Key: {
        productoId: { S: body.productoId }
      },
      UpdateExpression: "SET nombre = :n, categoria = :c, precio = :p, fechaCreacion = :f",
      ExpressionAttributeValues: {
        ":n": { S: body.nombre },
        ":c": { S: body.categoria },
        ":p": { N: body.precio.toString() },
        ":f": { S: body.fechaCreacion }
      }
    };

    await client.send(new UpdateItemCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Producto actualizado' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al actualizar producto', error: err })
    };
  }
};
