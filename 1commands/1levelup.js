const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");


module.exports.run = async (bot,message,args) => {
    
    let Suser = message.author
    let spaminterval =0.3
        if (Suser.LevelCheck) {
            if (new Date().getTime() - Suser.LevelCheck < spaminterval*1000) {
                //spams(message,Suser.LevelCheck,spaminterval)
                return;
            }
            else { Suser.LevelCheck = new Date().getTime()}
        }
        else { Suser.LevelCheck = new Date().getTime()}
        
    userName = message.author.username
    userIDs = message.author.id
    let SCORE = await db.fetch(`MTC_${userIDs}`,{target: `.score`})
    let LEVEL = await db.fetch(`MTC_${userIDs}`,{target: `.level`})
    let CRY = (50*LEVEL) * (LEVEL+1);
    let VAL = ((LEVEL*20)*(1+LEVEL))
    //console.log(SCORE+' '+LEVEL+' '+VAL)
    if(SCORE > VAL)
    {
        await db.add(`MTC_${userIDs}`,1,{target: `.level`})
        await db.add(`MTC_${userIDs}`,CRY,{target: `.crystals`})
        CRY = numberFormatter("#,##0.##", CRY);
        UserName = message.author.username;
        let LEVELEMBED = new Discord.RichEmbed()
        .setAuthor('LEVEL UP')
        .setColor('#49d7ff')
        .addField(`Congratulations ${userName} ,You have levelled up!!`,`**You got +${CRY} Crystals**`)
        .setFooter(`Level ${LEVEL+1}`)

        setTimeout(function(){
            spaminterval = 5;
            message.channel.send(LEVELEMBED)
        }, 10000);
    }

}
module.exports.help = {
    name : "levelupcheck"
}