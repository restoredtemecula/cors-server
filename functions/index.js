const { onRequest } = require("firebase-functions/v2/https");
const corsAnywhere = require("cors-anywhere");
const cors = require("cors");

const corsServer = corsAnywhere.createServer({
  originWhitelist: [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://www.restoredtemecula.church",
    "https://www.restoredtemecula.com",
    "https://restoredtemecula.church",
    "https://restoredtemecula.com",
  ],
  requireHeader: ["origin", "x-requested-with"],
  removeHeaders: ["cookie", "cookie2"],
});

const corsHandler = cors({ origin: true });

exports.proxy = onRequest((request, response) => {
  corsHandler(request, response, () => {
    corsServer.emit("request", request, response);
  });
});
