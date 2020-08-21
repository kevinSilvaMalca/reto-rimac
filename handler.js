'use strict';

module.exports.bienvenida = async event => {

  const mensaje = `Hola ${event.pathParameters.nombre} bienvenido al reto-rimac :D`;

  return JSON.stringify({
    statusCode: 200,
    body: ({
      message: mensaje,
    }),
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


module.exports.planetas = async event => {
  
  return JSON.stringify({
    statusCode: 200,
    body: ({
      message: "PLANETAS",
    }),
  });
};