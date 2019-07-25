const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");


module.exports.run = async (bot,message,args) => {
    
    let Suser = message.author
    let spaminterval =10
        if (Suser.Level) {
            if (new Date().getTime() - Suser.Level < spaminterval*1000) {
                spams(message,Suser.Level,spaminterval)
                return;
            }
            else { Suser.Level = new Date().getTime()}
        }
        else { Suser.Level = new Date().getTime()}

    userName = message.author.username
    LevelUserID = message.author.id

    let profile = await db.fetch(`MTC_${LevelUserID}`,{target : '.username'}) 
    if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)
        
    let SCORE = await db.fetch(`MTC_${LevelUserID}`,{target: `.score`})
    let LEVEL = await db.fetch(`MTC_${LevelUserID}`,{target: `.level`})
    let VAL = ((LEVEL*20)*(1+LEVEL))
    let LEFT = VAL - SCORE
    let NEWLEVEL = LEVEL+1

    let LEVELEMBED = new Discord.RichEmbed()
    .setAuthor('⟁ LEVEL STATUS ⟁')
    .setColor('#49ffb3')
    .addField(`\`💠\`${userName}, Your Level ${LEVEL}\`💠\``,`\`✨\`**Your Score is** ***__${SCORE}__***\`✨\``)
    .setFooter(`⫸ Need ${LEFT} score to reach level ${NEWLEVEL} ⫷`)

    message.channel.send(LEVELEMBED)
}
module.exports.help = {
    name : "level"
}