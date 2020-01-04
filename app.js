const config = require('./config/config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

// makes sure the bot is ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
    // don't respond to another bot message
    if (msg.author.bot) {
        return
    }
});

// log you in
client.login(config.token);