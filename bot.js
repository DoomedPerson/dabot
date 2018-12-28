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
    
    if (messagecontent.str.slice(1, 5) === "!play") {
        const messageURL = messagecontent.str.slice(6, end)
        
        if (str.search("youtube")) {
            const dispatcher = message.guild.voiceConnection.playStream(yt(messageURL, {audioonly: true}));
        }
    }
}); 

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
