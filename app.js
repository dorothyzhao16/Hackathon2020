const config = require('./config/config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const Sequelize = require('sequelize');
const SequelizeModels = require('./models');

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
    // msg.channel.send(`${authorMention}: hi :)`);

    if (message.startsWith('!cc ')) {
        // console.log('in');
        let args = message.split(' ');

        if (args[1] == 'major') {
            // get all the roles
            let roles = msg.member.guild.roles;
            let roleName = '';

            // make the role string
            for (let i = 2; i < args.length; i++) {
                roleName += args[i] + ' ';
            }

            // remove the trailing space
            roleName = roleName.substring(0, roleName.length - 1);

            // loop through all roles
            roles.forEach(role => {
                
                if (role.name == roleName) {
                    // user has the role
                    if (msg.member.roles.has(role.id)) {

                    }
                    // user doesn't have the role
                    else {
                        msg.member.addRole(role.id);
                    }

                }
            })
            // console.log(roles);
        }
        else if (args[1] == 'school') {
        }
        else if (args[1] == 'help') {
            let embed = new Discord.RichEmbed()
                .setTitle('CampusConnect Help')
                .addField('!cc major [major]', 'Add or remove the role for your major')
                .addField('!cc school [school]', 'Add or remove the role for your school');
            msg.channel.send(`${authorMention}:`, embed=embed);
        }
    }
});

client.on('guildMemberAdd', member => {
    const m = `Welcome to the CampusConnects Discord Server!\n\nMake sure to add your roles and college in the <#662845246006362114> to gain permission!`;
    member.send(m);
})
// log you in
client.login(config.token);