const axios = require("axios");
const { env } = require("process");

const axiosclient = axios.create({
  timeout: 1000 * 20,
});

exports.GET_ALL = async (v) => {
  try {
    const response = await axiosclient({
      method: "GET",
      url: `/planets/?search=${v ? v : ""}`,
      baseURL: process.env.URL_STARTWARS,
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
      baseURL: process.env.URL_STARTWARS,
    });

    return (planetas = response.data);
  } catch (error) {
    return { codRes: "99", message: error.message };
  }
};
