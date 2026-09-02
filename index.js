require("dotenv").config();

const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/svts-app-ask", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/svts-app-help", async ({ ack, respond }) => {
  await ack();

  await respond({
    text: `Available Commands:
/svts-app-ask - Ask the coding helper
/svts-app-help - Show available commands`
  });
});

app.command("/svts-app-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact: ${response.data.fact}` });
  } catch (error) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/svts-app-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke"
    );

    await respond({
      text: `${response.data.setup}\n${response.data.punchline}`
    });
  } catch (error) {
    await respond({ text: "Failed to fetch a joke." });
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();