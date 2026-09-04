require("dotenv").config();

const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/svts-app-ask", async ({ command, ack, respond }) => {
  await ack();

  const question = command.text.toLowerCase();

  if (!question) {
    await respond({
      text: "Ask me about coding! Try: `/svts-app-ask what is a loop?`"
    });
  } else if (question.includes("loop")) {
    await respond({
      text: "A loop repeats a block of code. In Python, common loops are `for` and `while` loops."
    });
  } else if (question.includes("syntaxerror") || question.includes("syntax error")) {
    await respond({
      text: "A SyntaxError means your code doesn't follow the language's syntax. Check things like missing colons, brackets, quotes, or incorrect indentation."
    });
  } else if (question.includes("function")) {
    await respond({
      text: "A function is a reusable block of code designed to perform a specific task."
    });
  } else if (question.includes("variable")) {
    await respond({
      text: "A variable stores a value that your program can use later, such as `score = 10`."
    });
  } else {
    await respond({
      text: "I don't know that one yet! Try asking about loops, variables, functions, or syntax errors."
    });
  }
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
