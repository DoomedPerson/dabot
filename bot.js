const Discord = require('discord.js');
const client = new Discord.Client();

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
            if (member.voiceChannel) {
                member.voiceChannel.join()
                    .then(connection => message.reply("Joined voice channel!"))
                    .catch(console.error);n() 
            }
            else
            {
                message.reply("You must be in a voice channel to start hosting.")   
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
}); 

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
