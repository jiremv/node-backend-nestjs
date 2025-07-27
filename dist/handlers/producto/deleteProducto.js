"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({});
const handler = async (event) => {
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
        await client.send(new client_dynamodb_1.DeleteItemCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Producto eliminado' })
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al eliminar producto', error: err })
        };
    }
};
exports.handler = handler;
