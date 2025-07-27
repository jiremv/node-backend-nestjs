"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({});
const handler = async () => {
    try {
        const data = await client.send(new client_dynamodb_1.ScanCommand({
            TableName: process.env.TABLENAME
        }));
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al leer productos', error: err })
        };
    }
};
exports.handler = handler;
