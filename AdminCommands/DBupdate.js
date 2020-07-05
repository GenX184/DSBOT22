const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");
const moment = require("moment")

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {

    if(message.author.id != '292675388180791297') return
    // if(message.member.guild.me.hasPermission("MANAGE_MESSAGES")) console.log('YES IT DOES MANAGE_MESSAGES')
    // if(message.member.guild.me.hasPermission("SEND_MESSAGES")) console.log('YES IT DOES SEND_MESSAGES')
  console.log(message.member.guild.me.hasPermission(`MANAGE_MESSAGES`))
    
    
}
module.exports.help = {
    name : "Batstats"
}