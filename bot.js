const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

const WATCHED_CHANNEL_ID = '1401018863713255445';

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== WATCHED_CHANNEL_ID) return;

  if (message.content.trim().toLowerCase() !== 'ok') {
    try {
      await message.delete();
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  }
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (newMessage.author?.bot) return;
  if (newMessage.channel.id !== WATCHED_CHANNEL_ID) return;

  if (newMessage.content?.trim().toLowerCase() !== 'ok') {
    try {
      await newMessage.delete();
    } catch (err) {
      console.error('Failed to delete edited message:', err);
    }
  }
});

client.login(process.env.TOKEN);