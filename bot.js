const Discord = require('discord.js');
const client = new Discord.Client();
const FFMPEG = require('ffmpeg');
const yt = require('ytdl-core');



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
    
    if (messagecontent === "!join") {
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
    }
    
    if (messagecontent === "!leave") {
        let adminRoleObject = member.guild.roles.find('name', 'Host');
        if (adminRoleObject) {
            if (message.guild.voiceConnection) {
                message.guild.voiceConnection.disconnect();
            }
        }
    }
    
    if (messagecontent === "!startscrim solo west") {
        server = message.server

        
        const dispatcher = message.guild.voiceConnection.playStream(yt("https://www.youtube.com/watch?v=EYFUnNtEaM8", {audioonly: true}));
    }
    
    if (messagecontent.slice(0, 5) === "!play") {
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
            }
        }
    }
    
    if (messagecontent.slice(0,5) === "!stop") {
        let adminRoleObject = member.guild.roles.find('name', 'Admin');
        if (adminRoleObject) {
            const dispatcher = message.guild.voiceConnection.stopStream()
            try {
                message.reply("Success")
            }
            catch {
                message.reply("Fail")
            }
        }
    }
}); 

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
