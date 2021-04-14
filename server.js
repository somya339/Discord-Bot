const Discord = require("discord.js");
const env = require('dotenv');
const bot = new Discord.Client();
const command = require('./commands/commands');
const reaction = require('./commands/first-reaction');

env.config();

bot.commands = new Discord.Collection();

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!`);

    bot.user.setActivity("My Code", {
        type: "PLAYING"
    });
    // ping (latency)
    command(bot, ["ping", 'latency'], message => {
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);
    })
    // members
    command(bot, ["servers", "members"], message => {
        bot.guilds.cache.forEach(guild => {
            message.channel.send(`${guild} has total of ${guild.memberCount} members`)
        })
    })
    // clear chat
    command(bot, ['cc', 'clearchannel'], message => {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.messages.fetch().then(result => {
                message.channel.bulkDelete(result);
            })
        }
    })
    reaction(bot, "831790513987780659", "hello world", ["🏓"])
});
// Add Role And Welcome New Member
bot.on('guildMemberAdd', member => {
    console.log('User' + member.user.tag + 'has joined the server!');

    var role = member.guild.roles.find('name', 'Member');

    client.channels.find("name", "welcome").send('Welcome ' + member.username)

    setTimeout(function () {
        member.addRole(role);
    }, 10000);
});

//Token need in .env
bot.login(process.env.Token)