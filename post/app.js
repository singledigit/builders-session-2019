const uuid = require('uuid/v1');
const AWS = require('aws-sdk');
const dc = new AWS.DynamoDB.DocumentClient();
const rh = require('/opt/response-handler');
const headers = [{"Access-Control-Allow-Origin":"*"}]

exports.lambdaHandler = async (event) => {
    try {
        let params = {
            TableName: process.env.RECORDS_TABLE,
            Item: JSON.parse(event.body)
        }

        params.Item['id'] = uuid();
        params.Item['timestamp'] = +new Date();


        await dc.put(params).promise();
        return rh.success(params.Item, headers);
    } catch (err) {
        return rh.fail(err, headers);
    }
};