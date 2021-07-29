const fs = require("fs");

exports.handler = function (event, context, callback) {
  const body = { aaa: "bbb" };

  const queryStringParameters = event.queryStringParameters;
  const q = queryStringParameters.q;

  if (q) {
    console.log({ q });
  }

  const jsonObject = JSON.parse(fs.readFileSync("list.json", "utf8"));

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(jsonObject),
  });
};
