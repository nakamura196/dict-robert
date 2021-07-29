//const fs = require("fs");
const axios = require("axios");

exports.handler = function (event, context, callback) {
  const URL = `https://nakamura196.github.io/enc_jk/list.json`;

  const queryStringParameters = event.queryStringParameters;
  const q = queryStringParameters.q;

  const limit = 2000;

  return axios
    .get(URL)
    .then(function (response) {
      const jsonObject = response.data;

      const items = [];

      for (let label in jsonObject) {
        if (!q || label.includes(q)) {
          items.push({
            label,
            id: jsonObject[label].split("=")[1],
          });
        }

        if (items.length >= limit) {
          break;
        }
      }

      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      };

      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify(items),
      });
    })
    .catch((e) => ({
      statusCode: 400,
      body: e,
    }));
};
