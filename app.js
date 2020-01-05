const config = require('./config/config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const Sequelize = require('sequelize');
const SequelizeModels = require('./models');
const db = require('./database.js');
const SequelizeConnect = new Sequelize({
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4'
    },
    pool: {
        max: 20,
        min: 0,
        idle: 10000
    },
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    logging: false
});

const medalEmoji = '🏅';

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
                        msg.member.removeRole(role.id)
                        msg.channel.send(`${authorMention}: Your ${roleName} major has been removed.`);
                    }
                    // user doesn't have the role
                    else {
                        msg.member.addRole(role.id)
                        msg.channel.send(`${authorMention}: Your ${roleName} major has been added.`);
                    }
                }
            })
            // console.log(roles);
        } else if (args[1] == 'school') {
            //PM user link to correct school server

            if (args[2] == 'OSU') {

                // user has the role
                if (msg.member.roles.has('662821729017790465')) {
                    msg.member.removeRole('662821729017790465');
                    msg.channel.send(`${authorMention}: Your school, Ohio State, has been removed.`);
                }

                // user doesn't have the role
                else {
                    msg.channel.send(`${authorMention}: Your school, Ohio State, has been added.`);
                    msg.member.addRole('662821729017790465');

                    const m = `https://discord.gg/6wJk2VB`;
                    msg.member.send(m);
                }


            } else {

                // user has the role
                if (msg.member.roles.has('662821589879881748')) {
                    msg.member.removeRole('662821589879881748');
                    msg.channel.send(`${authorMention}: Your school, Cleveland State, has been removed.`);
                }

                // user doesn't have the role
                else {
                    msg.member.addRole('662821589879881748');
                    msg.channel.send(`${authorMention}: Your school, Cleveland State, has been added.`);

                    const m = `https://discord.gg/Ej2Ftd4`;
                    msg.member.send(m);

                }
            }


        } else if (args[1] == 'schools') {
            // display all available schools
            msg.channel.send(`Here's a list of schools! \nCSU - Cleveland State University\nOSU - Ohio State University`);
        } else if (args[1] == 'help') {
            let embed = new Discord.RichEmbed()
                .setTitle('CampusConnect Help')
                .addField('Add or remove the role for your major', '!cc major [major]')
                .addField('Add or remove the role for your school', '!cc school [school]')
                .addField('See list of schools', '!cc schools')
                .addField('See number of points', '!cc points');
            msg.channel.send(`${authorMention}:`, embed = embed);
        } else if (args[1] == 'points') {
            if (msg.mentions.members.first() != undefined) {
                let mentionID = msg.mentions.members.first().user.id;
                db.getUserPoints(mentionID)
                    .then(points => {
                        msg.channel.send(`${authorMention}: <@${mentionID}> has ${points} points`);
                    })
                    .catch(console.error);
            } else {
                db.getUserPoints(authorID)
                    .then(points => {
                        msg.channel.send(`${authorMention}: You have ${points} points`);
                    })
                    .catch(console.error);
            }
        }
    }
});

client.on('guildMemberAdd', member => {
    const m = `Welcome to the CampusConnects Discord Server!\n\nMake sure to add your roles and college in the <#662845246006362114> to gain permission! Use \`!cc help\` to view the commands!`;
    member.send(m);
})

client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.emoji.name === medalEmoji) {
        db.setUserPoints(reaction.message.author.id, 1)
            .then(_ => {
                db.getUserPoints(reaction.message.author.id)
                    .then(points => {
                        if (points == 10) {
                            reaction.message.member.addRole('663093015539089435');
                            reaction.message.channel.send(`Congrats <@${reaction.message.author.id}>! You have leveled up`);
                        } else if (points == 25) {
                            reaction.message.member.removeRole('663093015539089435');
                            reaction.message.member.addRole('663093236725710859');
                            reaction.message.channel.send(`Congrats <@${reaction.message.author.id}>! You have leveled up`);
                        } else if (points == 50) {
                            reaction.message.member.removeRole('663093236725710859');
                            reaction.message.member.addRole('663093247031246858');
                            reaction.message.channel.send(`Congrats <@${reaction.message.author.id}>! You have leveled up`);
                        } else if (points == 100) {
                            reaction.message.member.removeRole('663093247031246858')
                            reaction.message.member.addRole('663093254136397854');
                            reaction.message.channel.send(`Congrats <@${reaction.message.author.id}>! You have leveled up`);
                        }
                    })
                    .catch(console.error);
            })
            .catch(console.error);
    }
})

client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.emoji.name === medalEmoji) {
        db.setUserPoints(reaction.message.author.id, -1);
    }
})
// log you in
client.login(config.token);