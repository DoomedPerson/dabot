const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    client.user.setStatus('available') // Can be 'available', 'idle', 'dnd', or 'invisible'
    client.user.setPresence({
        game: {
            name: 'you!',
            type: 3
        }
    });
});

client.on('message', message => {
    let member = message.member
    let messagecontent = message.content.toLowerCase();
    
    if (messagecontent === '!platform-commands') {
    	message.reply("Type '!PC-Player+' if your a PC player, '!XBox-Player+' if your a XBox player, '!PS4-Player+' if your a PS4 player, and '!Switch-Player+' if your a switch player. To remove your role type '!*platform*_Player-'");
    }
    
    if (messagecontent === '!pc-player+') {
        
        var Role = member.guild.roles.find("name", "PC");
        
        member.addRole(Role)
        
        message.reply("PC role added. (Not a PC player? Type !PC-Player-)")

    }
    
    if (messagecontent === '!pc-player-') {
        
        var Role = member.guild.roles.find("name", "PC");
        
        member.removeRole(Role)
        
        message.reply("PC role removed.")

    }
    
    if (messagecontent === '!xbox-player+') {
        
        var Role = member.guild.roles.find("name", "XBox");
        
        member.addRole(Role)
        
        message.reply("XBox role added. (Not a XBox player? Type !XBox-Player-)")

    }
    
    if (messagecontent === '!xbox-player-') {
        
        var Role = member.guild.roles.find("name", "XBox");
        
        member.removeRole(Role)
        
        message.reply("XBox role removed.")

    }
    
    if (messagecontent === '!ps4-player+') {
        
        var Role = member.guild.roles.find("name", "PS4");
        
        member.addRole(Role)
        
        message.reply("PS4 role added. (Not a PS4 player? Type !PS4-Player-)")

    }
    
    if (messagecontent === '!ps4-player-') {
        
        var Role = member.guild.roles.find("name", "PS4");
        
        member.removeRole(Role)
        
        message.reply("PS4 role removed.")

    }
    
    if (messagecontent === '!switch-player+') {
        
        var Role = member.guild.roles.find("name", "Switch");
        
        member.addRole(Role)
        
        message.reply("Switch role added. (Not a Switch player? Type !Switch-Player-)")

    }
    
    if (messagecontent.includes("heck")) {
        
        message.reply("no cuss in christian minecraft server")

    }
    
    
    if (messagecontent === '!switch-player-') {
        
        var Role = member.guild.roles.find("name", "Switch");
        
        member.removeRole(Role)
        
        message.reply("Switch role removed.")

    }
    
    if (messagecontent === '!alertadmins') {
        
        let adminRoleObject = member.guild.roles.find('name', 'Admin');
        message.channel.send("<@" + message.author.id + "> has alerted the admins. Unimportant stuff: <@476187069006217236> .")

    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
