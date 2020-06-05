require("dotenv/config");
const socketio = require("socket.io-client");
const axios = require("axios");

const app_name = process.env.APP_NAME;
const webhook_url = process.env.WH_URL;
const whats_service_id = process.env.WHATS_SERVICE_ID;
const mchat_url = process.env.APP_MCHAT_URL;

console.log(app_name);

const socket = socketio(webhook_url, {
  autoConnect: true,
  query: {
    user_id: String(app_name),
  },
});

socket.connect();

socket.on(whats_service_id, async (json) => {
  console.log("Nova mensagem do webhook");
  await axios.default.post(mchat_url, json);
  console.log("Mensagem enviada ao php");
});
