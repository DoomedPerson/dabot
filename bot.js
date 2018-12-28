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

        
        const dispatcher = message.guild.voiceConnection.playStream("https://www.youtube.com/watch?v=EYFUnNtEaM8", {audioonly: true});
        dispatcher.on('end', () => {

        voiceChannel.leave();
            message.channel.sendMessage('song finished')
        })
    }
}); 

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
