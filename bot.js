const Discord = require('discord.js');
const client = new Discord.Client();
const FFMPEG = require('ffmpeg');
var CronJob = require('cron').CronJob
const yt = require('ytdl-core');

const prefix = "!"

var stats = {}
var serverQueue = {}

var Globdispatcher = null

const blacklist = [
    "beeyotch",
    "biatch",
    "bitch",
    "chinaman",
    "chinamen",
    "chink",
    "crip",
    "cunt",
    "dago",
    "daygo",
    "dego",
    "dick",
    "dyke",
    "fag",
    "fatass",
    "fatso",
    "gash",
    "ass",
    "nig ga",
    "nig ger",
    "nigg er",
    "golliwog",
    "gook",
    "gyp",
    "halfbreed",
    "half-breed",
    "homo",
    "hooker",
    "jap",
    "kike",
    "kraut",
    "lame",
    "lardass",
    "lesbo",
    "lunatic",
    "negro",
    "nigga",
    "nigger",
    "nigguh",
    "paki",
    "pickaninnie",
    "pickaninny",
    "pussie",
    "pussy",
    "raghead",
    "retard",
    "skank",
    "slut",
    "spade",
    "spic",
    "spook",
    "tard",
    "tits",
    "titt",
    "trannie",
    "tranny",
    "twat",
    "wetback",
    "whore",
    "wop"
]


client.on('ready', () => {
    var server = client.guilds.get("474688021342453780")
    setInterval (function () {
        var num = server.memberCount - 4
        var lol = num.toString()

        var number = lol + " members."
        client.user.setStatus('available') // Can be 'available', 'idle', 'dnd', or 'invisible'
        client.user.setPresence({
            game: {
                name: number,
                type: 3 // 1: Playing, 2: Listening, 3: Watching
            }
        });
    }, 1 * 10000);
    
    /*client.user.setStatus('available') // Can be 'available', 'idle', 'dnd', or 'invisible'
    client.user.setPresence({
        game: {
            name: 'to you.',
            type: 2 // 1: Playing, 2: Listening, 3: Watching
        }
    });*/
    
});

client.on('message', message => {
    let member = message.member
    let messagecontent = message.content.toLowerCase();
    
    
    
    if (!serverQueue) {
        serverQueue = {
            id: message.guild.id,
            volume: 5
        }
    }
    
    const args = messagecontent.split(' ');
    
    if (messagecontent.startsWith(prefix+'join')) {
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
    } else if (messagecontent.startsWith(prefix+'leave')) {
        let adminRoleObject = member.guild.roles.find('name', 'Host');
        if (adminRoleObject) {
            if (message.guild.voiceConnection) {
                message.guild.voiceConnection.disconnect();
            }
        }
    } else if (messagecontent.startsWith(prefix+'startscrim')) {
        if (args[1] === "solo") {
            if (args[2] === "west")    {
                if (!message.guild.voiceConnection) return message.reply("I must be in a voice call to start.")
                const dispatcher = message.guild.voiceConnection.playStream(yt("https://www.youtube.com/watch?v=2I18638R4t4", {audioonly: true}));
                Globdispatcher = dispatcher;
                dispatcher.setVolumeLogarithmic(10 / 5)
                try {
                  message.reply("Starting scrims!")
                }
                catch {
                  message.reply("Fail")
                }
            }
        }

        return
    } else if (messagecontent.startsWith(prefix+'play')) {
        if (message.guild.voiceConnection) {
            var voiceChannel = message.member.voiceChannel
            const messageURL = message.content.slice(5, messagecontent.length)
            
            if (messageURL.search("https://youtube")) {
                if (!message.guild.voiceConnection) return message.reply("I must be in a voice call to play a song.")
                const dispatcher = message.guild.voiceConnection.playStream(yt(messageURL, {audioonly: true}))
                dispatcher.setVolumeLogarithmic(serverQueue.volume/5)
                Globdispatcher = dispatcher;
                try {
                  message.reply("Success")
                }
                catch {
                  message.reply("Fail")
                }
                
            }
        }
    } else if (messagecontent.startsWith(prefix+'volume')) {
        if (!args[1]) return message.channel.send('Current volume is: ' + serverQueue.volume)
        if (Globdispatcher) {
            serverQueue.volume = args[1]
            Globdispatcher.setVolumeLogarithmic(args[1] / 5)
            return message.channel.send('Volume changed.')
        }
        return undefined
    } else if (messagecontent.startsWith(prefix+'stop')) {
        let adminRoleObject = member.guild.roles.find('name', 'Admin');
        if (adminRoleObject) {
            if (Globdispatcher) {
                const dispatcher = Globdispatcher
                dispatcher.end();
            }
        }
    } else if (messagecontent.startsWith(prefix+'pause')) {
        if (!Globdispatcher) return
        Globdispatcher.pause();
    } else if (messagecontent.startsWith(prefix+'resume')) {
        if (!Globdispatcher) return
        Globdispatcher.resume();
    } else if (messagecontent.startsWith(prefix+'purge')) {
        let adminRoleObject = member.guild.roles.find('name', 'Admin');
        if (adminRoleObject) {
            if (!args[1]) return
            if (args[1] > 100) return message.reply("please choose an amount under 100!")
            message.channel.bulkDelete(args[1])
        }
    } 
    
    var arrayLength = blacklist.length;
    for (var i = 0; i < arrayLength; i++) {
        if (messagecontent.includes(blacklist[i])) {
            message.delete()
        }
    }

    if (message.channel.id === "539192953906790402") {

        /*let adminRoleObject = member.guild.roles.find('name', 'Big Thicc Gnome');
        if (!adminRoleObject) {
            message.delete()
        }*/
        message.delete()
        
        /*var mess = message.reply("Role added!")
        
            setTimeout(function(){ 
                mess.delete() 
            }, 3000);*/
        

   }
    
   if (messagecontent.startsWith(prefix+'waiting') || messagecontent.startsWith('waiting') || messagecontent.startsWith('wait')) {
    let role = member.guild.roles.find('name', 'Waiting List');
   
    member.addRole(role)
   }

    
    if (message.channel.id === "553654944297779212") {
        if (messagecontent.startsWith(prefix+'verify') || messagecontent.startsWith('verify') || messagecontent.startsWith('vr')) {
            let role = member.guild.roles.find('name', 'Member');
            
            member.addRole(role)
        }
        
        message.delete()

    }
    
    if (message.channel.id === "528041926448906242") {
        if (messagecontent.startsWith(prefix+'verify') || messagecontent.startsWith('verify') || messagecontent.startsWith('vr')) {
            let role = member.guild.roles.find('name', 'Member');
            
            member.addRole(role)
        }
        
        message.delete()

    }
}); 
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
