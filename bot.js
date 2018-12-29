const Discord = require('discord.js');
const client = new Discord.Client();
const FFMPEG = require('ffmpeg');
const yt = require('ytdl-core');

const prefix = "!"

const queue = new Map()



client.on('ready', () => {
    client.user.setStatus('available') // Can be 'available', 'idle', 'dnd', or 'invisible'
    client.user.setPresence({
        game: {
            name: 'you! dab',
            type: 3
        }
    });
});

client.on('message', message => {
    let member = message.member
    let messagecontent = message.content.toLowerCase();
    const serverQueue = queue.get(message.guild.id)
    
    
    if (!serverQueue) {
        const queueConstruct = {
            volume: 5,
            playing: false
        }
        serverQueue.set(msg.guild.id, queueConstruct);
    }
    
    const args = messagecontent.split(' ');
    
    if (messagecontent.startsWith('$[prefix]join') {
        let adminRoleObject = member.guild.roles.find('name', 'Host');
        if (adminRoleObject) {
            if (message.member.voiceChannel) {
                message.member.voiceChannel.join().then(function(connection) {
                    message.reply("hey baby u looking hot")
                });
                //.then(connection => message.reply("ugly boy"))
                //.catch(message.reply("error"));
            }
        }
    } else if (messagecontent.startsWith('$[prefix]leave') {
        let adminRoleObject = member.guild.roles.find('name', 'Host');
        if (adminRoleObject) {
            if (message.guild.voiceConnection) {
                message.guild.voiceConnection.disconnect();
            }
        }
    } else if (messagecontent.startsWith('$[prefix]startscrim') {
        server = message.server

        
        const dispatcher = message.guild.voiceConnection.playStream(yt("https://www.youtube.com/watch?v=EYFUnNtEaM8", {audioonly: true}));
    } else if (messagecontent.startsWith('$[prefix]play') {
        if (message.guild.voiceConnection) {
            const messageURL = message.content.slice(5, messagecontent.length)
            
            if (messageURL.search("https://youtube")) {

                const dispatcher = message.guild.voiceConnection.playStream(yt(messageURL, {audioonly: true}))
                try {
                  message.reply("Success")
                }
                catch {
                  message.reply("Fail")
                }
                
                dispatcher.setVolumeLogarithnic(serverQueue.volume/5)
            }
        }
    } else if (messagecontent.startsWith('$[prefix]volume')) {
        if (!args[1]) return message.channel.send('Current volume is: ${serverQueue.volume}')
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5)
        return undefined
    } else if (messagecontent.startsWith('$[prefix]stop')) {
        let adminRoleObject = member.guild.roles.find('name', 'Admin');
        if (adminRoleObject) {
            const dispatcher = message.guild.voiceConnection
            dispatcher.end();
        }
    }
}); 

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
