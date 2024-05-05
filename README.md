# Duo Bot

This is a "just for fun" discord bot for our private server.

## Env Variables

If you want to use this bot, set these variables accordingly in `.env`

```
DISCORD_TOKEN=
DISCORD_GUILD_ID=
DISCORD_CLIENT_ID=
DISCORD_REMINDER_CHANNEL_ID=
```

## Deploy update commands for Azure

This is just for me:

```sh
git pull
sudo docker compose build app
sudo docker compose down app
sudo docker compose up -d app
```
