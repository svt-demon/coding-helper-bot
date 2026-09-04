# Slack Coding Helper Bot

A Slack bot built with Node.js and Slack Bolt.

The bot uses custom slash commands to respond directly inside Slack, fetch information from APIs, and provide basic programming help.

## Features

- `/svts-app-help` - Shows the available commands
- `/svts-app-ask` - Answers basic coding questions about loops, variables, functions, and syntax errors
- `/svts-app-catfact` - Fetches a random cat fact from an API
- `/svts-app-joke` - Fetches a random joke from an API

## How it works

The bot uses Slack Bolt for handling slash commands and Axios for making API requests.

It is hosted on Hack Club Nest using a systemd service, allowing it to stay online 24/7 even when my laptop is turned off.

## Tech Stack

- Node.js
- Slack Bolt
- Axios
- Hack Club Nest
- GitHub

## Usage

Open the bot's channel in the Hack Club Slack workspace and try a command such as:

`/svts-app-help`

or

`/svts-app-ask what is a loop?`

## Security

Slack tokens and other private credentials are stored in a `.env` file and are not uploaded to GitHub.