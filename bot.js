const Discord = require('discord.js');
const client = new Discord.Client();
const FFMPEG = require('ffmpeg');
var CronJob = require('cron').CronJob
const yt = require('ytdl-core');

const prefix = "!"

var stats = {}
var serverQueue = {}

var Globdispatcher = null



client.on('ready', () => {
    client.user.setStatus('available') // Can be 'available', 'idle', 'dnd', or 'invisible'
    client.user.setPresence({
        game: {
            name: 'to you.',
            type: 2 // 1: Playing, 2: Listening, 3: Watching
        }
    });
    
    var CronJob = require('cron').CronJob;
    var job = new CronJob('00 43 14 * * 0-6', function() {
      /*
       * Runs every day
       * at 12:00:00 AM.
       */
       client.channels.get(476548171598790668).send("it is time guys")
      }, function () {
        /* This function is executed when the job stops */
      },
      true, /* Start the job right now */
      'America/Los_Angeles' /* Time zone of this job. */
    );
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
        if (!args[1]) return
        if (args[1] > 100) return message.reply("please choose an amount under 100!")
        message.channel.bulkDelete(args[1])
    } else if (messagecontent.startsWith(prefix+'presence')) {
        let adminRoleObject = member.guild.roles.find('name', 'TBS Founders');
        if (!adminRoleObject) return message.delete()
        message.reply(args[1] + args[2] + args[3])
        client.user.setStatus(args[1] || 'available') // Can be 'available', 'idle', 'dnd', or 'invisible'
        client.user.setPresence({
            game: {
                name: args[2] || 'to you.',
                type: args[3] || 2 // 1: Playing, 2: Listening, 3: Watching
            }
        });
        message.delete()
    }
}); 
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
