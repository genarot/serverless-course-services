import AWS from 'aws-sdk';
import createError from 'http-errors';
import commonMiddleware from "../lib/commonMiddleware";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, _context) {
    let auctions;

    try {
        const results = await dynamodb.scan({TableName: process.env.AUCTIONS_TABLE_NAME,}).promise();

        auctions = results.Items;
    } catch (error) {
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(auctions),
    };
}

export const handler = commonMiddleware(getAuctions);

