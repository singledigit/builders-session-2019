const AWS = require('aws-sdk');
const dc = new AWS.DynamoDB.DocumentClient();
const rh = require('/opt/response-handler');
const headers = [{"Access-Control-Allow-Origin":"*"}]


exports.lambdaHandler = async (event) => {
    let params = {
        TableName: process.env.RECORDS_TABLE
    }
    
    try{
        let results = await dc.scan(params).promise();
        return rh.success(results.Items, headers)
    } catch(err){
        return rh.fail(err, headers);
    }
    
};
