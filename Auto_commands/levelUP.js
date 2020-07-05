const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");

var DBbot = new db.table(`DBbot`);
var DBidle = new db.table('DBidle');
var DBgift = new db.table(`DBgift`);
var DBstats = new db.table('DBstats');
var DBlevel = new db.table('DBlevel');
var DBrole = new db.table('DBBotRole');
var DBserver = new db.table(`DBserver`);
var DBprofile = new db.table('DBprofile');
var DBcollections = new db.table('DBcollections');
var DBguildSetting = new db.table('DBguildSetting');
var DBachievements = new db.table('DBachievements');


module.exports = async (bot,message,args) => {
  
   if(message.author.id!='292675388180791297') return
  
    bot.LevelUpEmbed = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle) => { 
        let Suser = message.author
        let spaminterval = 1
        if (Suser.LevelCheck) {
            if (new Date().getTime() - Suser.LevelCheck < spaminterval*1000) {
                //spams(message,Suser.LevelCheck,spaminterval)
                return;
            }
            else { Suser.LevelCheck = new Date().getTime()}
        }
        else { Suser.LevelCheck = new Date().getTime()}
      
        let profile = await DBprofile.fetch(`TC_${message.author.id}`,{target:`.username`})
        if(!profile || message.author.id==='681344320539721748') return
        Suser.LevelMessage = message
        LevelUserName = message.author.username
        LevelUserIDs = message.author.id
        let SCORE = await DBprofile.fetch(`TC_${LevelUserIDs}`,{target: `.score`})
        let LEVEL = await DBlevel.fetch(`TC_${LevelUserIDs}`,{target: `.level`}) + 1
        let VAL = LEVEL * LEVEL * 5;
        let CRY = VAL * 5;  
        if(SCORE > VAL)
        {
            await DBlevel.add(`TC_${LevelUserIDs}`,1,{target: `.level`})
            await DBprofile.add(`TC_${LevelUserIDs}`,CRY,{target: `.crystals`})

            CRY = numberFormatter("#,##0.##", CRY);
            let LEVELEMBED = new Discord.RichEmbed()
            .setAuthor('LEVEL UP')
            .setColor('#49d7ff')
            .addField(`Congratulations ${LevelUserName} ,You have levelled up!!`,`**You got +${CRY} Crystals**`)
            .setFooter(`Level ${LEVEL}`)

            message.reply(LEVELEMBED)

            // setTimeout(function(){
            //     Suser.LevelMessage.channel.send(LEVELEMBED)
            // }, 200);
        }
    }
    
    await bot.LevelUpEmbed(bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle)
}
