const Discord = require('discord.js');
const client = new Discord.Client();
const FFMPEG = require('ffmpeg');
var CronJob = require('cron').CronJob
const yt = require('ytdl-core');

const prefix = "!"

var stats = {}
var serverQueue = {}

var warns = {}

var Globdispatcher = null

const blacklist = [
    "beeyotch",
    "biatch",
    "bitch",
    "chink",
    "crip",
    "cunt",
    "dego",
    "dick",
    "fag",
    "fatass",
    "ass",
    "nig ga",
    "nig ger",
    "nigg er",
    "golliwog",
    "gook",
    "gyp",
    "halfbreed",
    "half-breed",
    "hooker",
    "jap",
    "kike",
    "kraut",
    "lardass",
    "lesbo",
    "negro",
    "nigga",
    "nigger",
    "nigguh",
    "pussie",
    "pussy",
    "slut",
    "spade",
    "spic",
    "tard",
    "tits",
    "titt",
    "trannie",
    "tranny",
    "wetback",
    "whore",
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
    
    if (!warns) {
        warns = {
        
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
    } else if (messagecontent.startsWith(prefix+'scrim')) {
        exampleEmbed = {"fields":[{"name":"Custom Code","value":"{code}","inline":false},{"name":"Mode","value":"{mode}","inline":true},{"name":"Region ","value":"{yo mama}","inline":true},{"name":"Rules","value":"{Rules}","inline":true},{"name":"Remember","value":"{stuff to remember}","inline":false},{"name":"Host","value":"host thingsy yeah -- [Watch the Stream](https://www.twitch.com/ \"Check out the hosts stream.\")","inline":false},{"name":"Report","value":"!report{or however you want this to work}","inline":false}],"title":"Custom Match Making Starting Soon","color":7223097}
               
        message.send({ embed: exampleEmbed });
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
    
     if (message.content.startsWith(prefix+"kick")) {
        // Easy way to get member object though mentions.
        let adminRoleObject = member.guild.roles.find('name', 'Admin');
        let adminRoleObjects = member.guild.roles.find('name', 'Cofounder');
        let specialAdmin = member.guild.roles.find('name', 'Leader')
        let adm = member.guild.roles.find('name', 'Big Thicc Gnome')
        if (adminRoleObject || adminRoleObjects || specialAdmin || adm) {
            var memberr = message.mentions.members.first();
            // Kick
            memberr.kick().then((memberr) => {
                // Successmessage
                message.channel.send(":wave: " + memberr.displayName + " has been successfully kicked :point_right: ");
            }).catch(() => {
                 // Failmessage
                message.channel.send("Unable to kick.");
            });
        }
    //}
    
     /*if (message.content.startsWith(prefix+"kick")) {
        // Easy way to get member object though mentions.
        let adminRoleObject = member.guild.roles.find('name', 'Cofounder');
        let specialAdmin = member.guild.roles.find('name', 'Leader')
        let adm = member.guild.roles.find('name', 'Big Thicc Gnome')
        if (adminRoleObject || specialAdmin || adm) {
            var membere = message.mentions.members.first();
            // Kick
            membere.kick().then((membere) => {
                // Successmessage
                message.channel.send(":wave: " + membere.displayName + " has been successfully kicked :point_right: ");
            }).catch(() => {
                 // Failmessage
                message.channel.send("Unable to kick.");
            });
        }*/
    } else if (messagecontent.startsWith(prefix+'warn')) {
        let adminRoleObject = member.guild.roles.find('name', 'Admin');
        let adminRoleObjects = member.guild.roles.find('name', 'Cofounder');
        let specialAdmin = member.guild.roles.find('name', 'Leader')
        let adm = member.guild.roles.find('name', 'Big Thicc Gnome')
        let wUser = message.mentions.users.first() || message.guild.members.get(args[1])
        if (wUser) {
            if (adminRoleObject || adminRoleObjects || specialAdmin || adm) {
                if (!warns[wUser.id]) {
                    warns[wUser.id] = 0
                }

                warns[wUser.id] = warns[wUser.id] +  1
                message.reply(wUser.tag + " has been warned. This is warn number " + warns[wUser.id] + ".")
                var warningEmbed = new Discord.RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
                    .setColor("36393E")
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .setTitle(`You've been warned in ${message.guild.name}`)
                    .addField('Warned by', message.author.name)
                    .addField('Reason', args[2] || "not given.")
                    .setTimestamp();
                wUser.send({ embed: warningEmbed }); // DMs the user the above embed!
            }
        }
    }
    if(message.mentions.users.size > 25 && !message.author.perms.has("MENTION_EVERYONE")) {
        member.kick().then((member) => {
         // Successmessage
        message.channel.send(":wave: " + member.displayName + " has been kicked for pinging a large amount of people without permission! :point_right: ");
        }).catch(() => {

        });
    
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
