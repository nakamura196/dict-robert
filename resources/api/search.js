const fs = require("fs");

exports.handler = function (event, context, callback) {
  const queryStringParameters = event.queryStringParameters;
  const q = queryStringParameters.q;

  const limit = 2000;

  const jsonObject = JSON.parse(fs.readFileSync("list.json", "utf8"));

  const items = [];

  for (let label in jsonObject) {
    if (!q || label.includes(q)) {
      items.push({
        label,
        id: jsonObject[key].split("=")[1],
      });
    }

    if (items.length >= limit) {
      break;
    }
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(items),
  });
};
