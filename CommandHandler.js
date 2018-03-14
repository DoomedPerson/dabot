// Require
const Discord = require('discord.js')

// Configure
const client = new Discord.Client();
const prefix = '-'; // Prefix for commands

// Listen
client.on('message', message => { // Runs when a message is recieved.

    // Variables
    let msg = message.content.toUpperCase(); // Make it all CAPS
    let sender = message.author; // Holds the message sender.
    let args = message.content.slice(prefix.length).trim().split(' '); // Slice off the prefix

    let cmd = args.shift().toLowerCase(); // Make it all lower case.

    // Return Statements

    if (!msg.startsWith(prefix)) return; // If it doesnt start with the prefix return.
    if (message.author.bot) return; // If a bot sends the message then shhhhh.

    // Command Handler
    try { // Try to run the code

        let commandFile = require('./commands/' + cmd + '.js'); // WOWWWWW :C
        commandFile.run(client, message, args, cmd); // Attempt running the code

    } catch (e) { // If error cri

        console.log(e.message); // Tell me the error

    } finally { // Run after all

        console.log(message.author.tag + ' ran the command ' + cmd); // logz

    }

})

// Runs whenever the bot is turned on.
client.on('ready', () => {
    console.log('Bot Online')

    client.user.setStatus('Online')
    client.user.setActivity('i loik food')
})

// Log into the discord bot.
client.login('process.env.BOT_TOKEN') // Token
