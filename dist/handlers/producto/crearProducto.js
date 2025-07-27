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
            Item: {
                productoId: { S: body.productoId },
                nombre: { S: body.nombre },
                categoria: { S: body.categoria },
                precio: { N: body.precio.toString() },
                fechaCreacion: { S: body.fechaCreacion }
            }
        };
        await client.send(new client_dynamodb_1.PutItemCommand(params));
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Producto creado correctamente' })
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al crear el producto', error: err })
        };
    }
};
exports.handler = handler;
