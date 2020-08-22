// const starWars = require("../helpers/consumers/starwars");
// const renameKeys = require("../utils/renamekeys");
// const conexionDynamo = require("../db/dynamoDB");

// module.exports.putPlanetas = async (event) => {
//   try {
//     const jsonUpdate = JSON.parse(event.body);

//     const updateDynamo = await conexionDynamo.putPlanetas(jsonUpdate);

//     const res = {
//       statusCode: 200,
//       body: JSON.stringify({
//         codRes: "00",
//         updateDynamo,
//       }),
//     };

//     return res;
//   } catch (error) {
//     return error;
//   }
// };
