const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const planetaSW = process.env.POST_TABLE;

class DynamoDB {
  static async InsertDynamoDB(params) {
    try {
      await db
        .put({
          TableName: planetaSW,
          Item: params,
        })
        .promise();

      return {
        statusCode: 201,
        body: JSON.stringify(params),
      };
    } catch (err) {
      return {
        statusCode: err.statusCode,
        body: err,
      };
    }
  }

  static async SearchDynamoDB(params) {
    try {
      const jsonSearch = {
        TableName: planetaSW,
        params,
      };

      const result = await db.scan(jsonSearch).promise();

      return result.Items[0];
    } catch (error) {
      return {
        statusCode: error.statusCode,
        body: error,
      };
    }
  }
}

module.exports = DynamoDB;
