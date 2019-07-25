const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");


module.exports.run = async (bot,message,args) => {
    
    let Suser = message.author
    let spaminterval =2
        if (Suser.Ping) {
            if (new Date().getTime() - Suser.Ping < spaminterval*1000) {
                spams(message,Suser.Ping,spaminterval)
                return;
            }
            else { Suser.Ping = new Date().getTime()}
        }
        else { Suser.Ping = new Date().getTime()}

    let prefix = Prefix.prefix;
    user = message.author.id;
    user_display = message.member.displayName
    message.channel.send(`\`📡\`**Opening Containers at a speed off \`${bot.pings[0]}ms\` \`❕\`**`);

}
module.exports.help = {
    name : "ping"
}