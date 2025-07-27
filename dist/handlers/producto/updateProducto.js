"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({});
const handler = async (event) => {
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
        await client.send(new client_dynamodb_1.UpdateItemCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Producto actualizado' })
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al actualizar producto', error: err })
        };
    }
};
exports.handler = handler;
