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

  // static async putDynamoDB(params) {
  //   try {
  //     const jsonUpdate = {
  //       TableName: planetaSW,
  //       Key: {
  //         nombre: params.nombre,
  //       },
  //       UpdateExpression: `SET periodo_rotacion = :periodo_rotacion`,
  //       // ConditionExpression: `attribute_exists(nombre)`,
  //       // periodo_orbital = :periodo_orbital,
  //       // diametro = :diametro,
  //       // clima = :clima,
  //       // gravedad = :gravedad,
  //       // suelo = :suelo,
  //       // agua_superficial = :agua_superficial,
  //       // poblacion = :poblacion,
  //       // editado = :editado,
  //       // url = :url`,
  //       ExpressionAttributeValues: {
  //         ":periodo_rotacion": params.periodo_rotacion,
  //         // ":periodo_orbital": params.periodo_orbital,
  //         // ":diametro": params.diametro,
  //         // ":clima": params.clima,
  //         // ":gravedad": params.gravedad,
  //         // ":suelo": params.suelo,
  //         // ":agua_superficial": params.agua_superficial,
  //         // ":poblacion": params.poblacion,
  //         // ":editado": new Date().toISOString(),
  //         // ":url": params.url,
  //       },
  //       ReturnValues: "UPDATED_NEW",
  //     };

  //     const result = await db.update(jsonUpdate).promise();

  //     return result;
  //   } catch (error) {
  //     return {
  //       statusCode: error.statusCode,
  //       body: error,
  //     };
  //   }
  // }
}

module.exports = DynamoDB;
