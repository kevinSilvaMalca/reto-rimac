const axios = require("axios");

const axiosclient = axios.create({
  timeout: 1000 * 90, //1'30'''
});

exports.GET_ALL = async (v) => {
  try {
    const response = await axiosclient({
      method: "GET",
      url: "/planets/",
      baseURL: `https://swapi.py4e.com/api`,
    });

    return (planetas = response.data);
  } catch (error) {
    return { codRes: "99", message: error.message };
  }
};

exports.GET = async (id) => {
  try {
    const response = await axiosclient({
      method: "GET",
      url: `/planets/${id}`,
      baseURL: `https://swapi.py4e.com/api`,
    });

    return (planetas = response.data);
  } catch (error) {
    return { codRes: "99", message: error.message };
  }
};
