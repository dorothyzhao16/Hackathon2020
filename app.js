const config = require('./config/config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

// makes sure the bot is ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
    let authorMention = msg.author;
    let message = msg.content;
    let authorID = authorMention.id;
    let channel = msg.channel;
    let authorName = authorMention.username;
    console.log(`${authorName}: ${message}`);
    // don't respond to another bot message
    if (msg.author.bot) {
        return
    }
    msg.channel.send(`${authorMention}: hi :)`);
});

// log you in
client.login(config.token);