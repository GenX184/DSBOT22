const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const smily = require("../emoji.js");
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
    const TCemojis = new smily; 

    let messageArray = message.content.split(' ');
    let userID = message.author.id


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

    let profile = await db.fetch(`MTC_${userID}`,{target : '.username'}) 
    if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)

    
        Servers = bot.guilds.size;
        Members = 0;
        await bot.guilds.forEach((guild) => {
            Members+=parseInt(guild['memberCount'])
        })

        Dprices = containerPrice['WOLVES']
        WolvesC = await db.fetch(`NTC_BOT_containers_WOLVES`)
        LionsC = await db.fetch(`NTC_BOT_containers_LIONS`)
        BearsC = await db.fetch(`NTC_BOT_containers_BEARS`)
        WolvesC = parseInt(WolvesC)
        LionsC = parseInt(LionsC)
        BearsC = parseInt(BearsC)
        Dprices = parseInt(Dprices)
        await db.startsWith(`NTC_BOT_containers`,{sort:`.data`}).then(resp =>{
                TC=0;
                for(var i in resp){
                        TC +=resp[i].data
                }
        }); 
        TotalC = parseInt(TC)
        costW = Math.round((Dprices + Dprices*(WolvesC/TotalC)*(WolvesC/100)) - (TotalC/1000)*10) 
        costL = Math.round((Dprices + Dprices*(LionsC/TotalC)*(LionsC/100)) - (TotalC/1000)*10) 
        costB = Math.round((Dprices + Dprices*(BearsC/TotalC)*(BearsC/100)) - (TotalC/1000)*10)      

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

        await db.startsWith(`NTC_BOT_paints_C`,{sort:`.data`}).then(resp =>{
                CT=0;
                for(var i in resp){
                        CT +=resp[i].data
                }
        });
        await db.startsWith(`NTC_BOT_paints_R`,{sort:`.data`}).then(resp =>{
                RT=0;
                for(var i in resp){
                        RT +=resp[i].data
                }
        });
        await db.startsWith(`NTC_BOT_paints_E`,{sort:`.data`}).then(resp =>{
                ET=0;
                for(var i in resp){
                        ET +=resp[i].data
                }
        });
        await db.startsWith(`NTC_BOT_paints_L`,{sort:`.data`}).then(resp =>{
                LT=0;
                for(var i in resp){
                        LT +=resp[i].data
                }
        });
        await db.startsWith(`NTC_BOT_paints_A`,{sort:`.data`}).then(resp =>{
                AT=0;
                for(var i in resp){
                        AT +=resp[i].data
                }
        });
        await db.startsWith(`NTC_BOT_paints_W`,{sort:`.data`}).then(resp =>{
                WT=0;
                for(var i in resp){
                        WT +=resp[i].data
                }
        });  
        
        await db.startsWith(`NTC_BOT_paints`,{sort:`.data`}).then(resp =>{
                TT=0;
                for(var i in resp){
                        TT +=resp[i].data
                }
        });                    

        TCW = await db.fetch(`NTC_BOT_containers_WOLVES`)
        TCL = await db.fetch(`NTC_BOT_containers_LIONS`)
        TCB = await db.fetch(`NTC_BOT_containers_BEARS`)

        TotalContainers = numberFormatter("#,##0.##",TotalContainers)
        TotalPaints = numberFormatter("#,##0.##",TotalPaints)

        TCW = parseInt(TCW)
        TCL = parseInt(TCL)
        TCB = parseInt(TCB)
        TotalContainers = TCW +TCL + TCB;

        TCW = numberFormatter("#,##0.##",TCW)
        TCL = numberFormatter("#,##0.##",TCL)
        TCB = numberFormatter("#,##0.##",TCB)
 
        UserIcon = bot.user.avatarURL

        let Embed = new Discord.RichEmbed()
        .setAuthor('TankiCrates Stats',UserIcon)
        .setThumbnail(UserIcon)
        .setColor("#00bca3")
        .addField('__Containers__',`
**Wolves** : *${TCW}*
**Lions** : *${TCL}*
**Bears** : *${TCB}*
**Total Containers** : *${TotalContainers}*`,true)
        .addField('__Shop Prices__',`
**Wolves** : *${costW}*
**Lions** : *${costL}*
**Bears** : *${costB}*`,true)
        .addField('__Paints__',`
**Common** : *${CT}*
**Rare** : *${RT}*
**Epic** : *${ET}*
**Legendary** : *${LT}*
**Artefact** : *${AT}*
**WarMedal** : *${WT}*
**Total Paints** : *${TT}*`)
        .setFooter(`Hint: ${prefix}profile --> Display your profile`);

        message.channel.send(Embed);
    
}
module.exports.help = {
    name : "gamestats"
}