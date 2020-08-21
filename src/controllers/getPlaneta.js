const starWars = require("../helpers/consumers/starwars");
const renameKeys = require("../utils/renamekeys");
const { ConsoleTransportOptions } = require("winston/lib/winston/transports");

module.exports.getPlanetasAll = async (event) => {
  try {
    console.log(event.multiValueQueryStringParameters.search);

    const jsonTotal = await starWars.GET_ALL(event);
    if (jsonTotal.codRes == "99") {
      throw new Error(`Error del api StarWars`);
    }

    const jsonRenombre = await rename(jsonTotal);

    const res = {
      statusCode: 200,
      body: JSON.stringify({
        codRes: "00",
        contador: planetas.count,
        resultado: jsonRenombre,
      }),
    };

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
