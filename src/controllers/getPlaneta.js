const starWars = require("../helpers/consumers/starwars");
const renameKeys = require("../utils/renamekeys");
const conexionDynamo = require("../db/dynamoDB");

module.exports.getPlanetasAll = async (event) => {
  let res;
  try {
    const nombrePlaneta = event.multiValueQueryStringParameters.search[0];
    // 1.- LLEGA CON SEARCH?
    if (nombrePlaneta) {
      const params = {
        Key: {
          nombre: nombrePlaneta,
        },
      };

      const busquedaDynamo = await conexionDynamo.SearchDynamoDB(params);
      // 2.- EXISTE EN DYNAMO?
      if (busquedaDynamo && busquedaDynamo.nombre == nombrePlaneta) {
        res = {
          statusCode: 200,
          body: JSON.stringify({
            ...busquedaDynamo,
          }),
        };
      } else {
        const jsonTotal = await starWars.GET_ALL(nombrePlaneta);
        if (jsonTotal.codRes == "99") {
          throw new Error(`Error del api StarWars`);
        }

        const jsonRenombre = await rename(jsonTotal);

        res = {
          statusCode: 200,
          body: JSON.stringify({
            codRes: "00",
            contador: jsonTotal.count,
            resultado: jsonRenombre,
          }),
        };
      }
    } else {
      const jsonTotal = await starWars.GET_ALL(nombrePlaneta);
      if (jsonTotal.codRes == "99") {
        throw new Error(`Error del api StarWars`);
      }

      const jsonRenombre = await rename(jsonTotal);

      res = {
        statusCode: 200,
        body: JSON.stringify({
          codRes: "00",
          contador: jsonTotal.count,
          resultado: jsonRenombre,
        }),
      };
    }

    return res;
  } catch (error) {
    return error;
  }
};

module.exports.getPlanetaIdNombre = async (event) => {
  try {
    let arrayJson = [];
    const id = event.pathParameters.id;

    const jsonTotal = await starWars.GET(id);
    if (jsonTotal.codRes == "99") {
      throw new Error(`Error del api StarWars`);
    }

    arrayJson.push(jsonTotal);

    const jsonRename = { results: arrayJson };

    const jsonRenombre = await rename(jsonRename);

    const res = {
      statusCode: 200,
      body: JSON.stringify({
        codRes: "00",
        ...jsonRenombre[0],
      }),
    };

    return res;
  } catch (error) {
    return error;
  }
};

const rename = async (v) => {
  const labels = {
    name: "nombre",
    rotation_period: "periodo_rotacion",
    orbital_period: "periodo_orbital",
    diameter: "diametro",
    climate: "clima",
    gravity: "gravedad",
    terrain: "suelo",
    surface_water: "agua_superficial",
    population: "poblacion",
    created: "creado",
    edited: "editado",
    url: "url",
  };

  const renameResponse = v.results.map((el) => {
    return renameKeys.ObjKeyRename(el, labels);
  });

  return renameResponse;
};
