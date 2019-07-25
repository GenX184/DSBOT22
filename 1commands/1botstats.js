const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");


module.exports.run = async (bot,message,args) => {

//     if(message.author.id != '292675388180791297')
//     {
//         if(message.guild.id != '442704155644264450') return
//     }

    let textfile = JSON.parse(fs.readFileSync("AGameBase/TextFile.json","utf8"));
    let container = JSON.parse(fs.readFileSync("ADataBase/NewCrates.json","utf8"));
    let paintName = JSON.parse(fs.readFileSync("ADataBase/PaintNameDB.json","utf8"));
    let paints = JSON.parse(fs.readFileSync("ADataBase/PaintsDB.json","utf8"));
    let containerPrice = JSON.parse(fs.readFileSync("ADataBase/ContainerPrice.json","utf8"));
    let prefix = Prefix.prefix;

    let messageArray = message.content.split(' ');
    let BotSpamUserID = message.author.id


    let Suser = message.author
    let spaminterval =10
        if (Suser.BotStats) {
            if (new Date().getTime() - Suser.BotStats < spaminterval*1000) {
                spams(message,Suser.BotStats,spaminterval)
                return;
            }
            else { Suser.BotStats = new Date().getTime()}
        }
        else { Suser.BotStats = new Date().getTime()}
    
        Servers = bot.guilds.size;
        Members = 0;
        await bot.guilds.forEach((guild) => {
            Members+=parseInt(guild['memberCount'])
        })

        await db.startsWith(`MTC`,{sort:`.data`}).then(resp =>{
                GameUsers = resp.length
        });
        await db.startsWith(`NTC_BOT_paints`,{sort:`.data`}).then(resp =>{
                TotalPaints=0;
                for(var i in resp){
                    TotalPaints += resp[i].data
                }
        });        
        await db.startsWith(`NTC_BOT_containers`,{sort:`.data`}).then(resp =>{
                TotalContainers=0;
                for(var i in resp){
                    TotalContainers += resp[i].data
                }
        });              

        TotalContainers = numberFormatter("#,##0.##",TotalContainers)
        TotalPaints = numberFormatter("#,##0.##",TotalPaints)

        UserIcon = bot.user.avatarURL

        let Embed = new Discord.RichEmbed()
        .setAuthor('TankiCrates Stats',UserIcon)
        .setThumbnail(UserIcon)
        .setColor("#00bca3")
        .addField('BOT',`
**Servers** : *${Servers}*
**Members** : *${Members}*
**Ping**    : *${bot.pings[0]} ms*
----------------------`)
        .addField('GAME',`
**User ** : *${GameUsers}*
**Total Paints ** : *${TotalPaints}*
**Total Containers ** : *${TotalContainers}*
----------------------`,true)
        .setFooter(`Hint: Try ${prefix}gamestats command\nRequested by ${message.author.username}`);

        message.channel.send(Embed);
    

}
module.exports.help = {
    name : "botstats"
}