const starWars = require("../helpers/consumers/starwars");
const renameKeys = require("../utils/renamekeys");
const conexionDynamo = require("../db/dynamoDB");

const { v4: uuidv4 } = require("uuid");

module.exports.postPlanetaDB = async (event) => {
  try {
    let res;
    const planetaNew = JSON.parse(event.body);

    const params = {
      Key: {
        nombre: planetaNew.nombre,
      },
    };

    const searchDynamo = await conexionDynamo.SearchDynamoDB(params);

    if (searchDynamo == planetaNew.nombre) {
      res = {
        statusCode: 200,
        body: JSON.stringify({ ...searchDynamo }),
      };
    } else {
      const jsonDB = {
        id: uuidv4(),
        ...planetaNew,
        creadoAWS: new Date().toDateString(),
      };

      const insertDynamo = await conexionDynamo.InsertDynamoDB(jsonDB);
      res = insertDynamo;
    }

    return res;
  } catch (error) {
    return error;
  }
};
