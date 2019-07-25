const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const smily = require("../emoji.js");
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
    let player = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(player)
    {
         userID = player.id
    }
    else{
         userID = message.author.id
    }
    console.log(userID)

    let Suser = message.author
    let spaminterval =10
        if (Suser.ProfileSpam) {
            if (new Date().getTime() - Suser.ProfileSpam < spaminterval*1000) {
                spams(message,Suser.ProfileSpam,spaminterval)
                return;
            }
            else { Suser.ProfileSpam = new Date().getTime()}
        }
        else { Suser.ProfileSpam = new Date().getTime()}

    let profile = await db.fetch(`MTC_${userID}`,{target : '.username'}) 
    if(player)
    {
            if(!profile) return message.channel.send(`**:file_folder: | ${player.displayName} does not have a Profile yet**`)
    }
    else{
            if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)
    }
    
        data =  await db.fetch(`MTC_${userID}`)
        UserName = data.username
        Crystals = data.crystals
        Supplies = data.supplies
        Rating = data.rating
        Scores = data.score
        Level = data.level
        TotalPaints = data.totalpaints

        await db.startsWith(`NTC_${userID}_paints_C`,{sort:`.data`}).then(resp =>{
                CT=0;
                for(var i in resp){
                        CT +=resp[i].data
                }
        });
        await db.startsWith(`NTC_${userID}_paints_R`,{sort:`.data`}).then(resp =>{
                RT=0;
                for(var i in resp){
                        RT +=resp[i].data
                }
        });
        await db.startsWith(`NTC_${userID}_paints_E`,{sort:`.data`}).then(resp =>{
                ET=0;
                for(var i in resp){
                        ET +=resp[i].data
                }
        });
        await db.startsWith(`NTC_${userID}_paints_L`,{sort:`.data`}).then(resp =>{
                LT=0;
                for(var i in resp){
                        LT +=resp[i].data
                }
        });
        await db.startsWith(`NTC_${userID}_paints_A`,{sort:`.data`}).then(resp =>{
                AT=0;
                for(var i in resp){
                        AT +=resp[i].data
                }
        });
        await db.startsWith(`NTC_${userID}_paints_W`,{sort:`.data`}).then(resp =>{
                WT=0;
                for(var i in resp){
                        WT +=resp[i].data
                }
        });        
        await db.startsWith(`NTC_${userID}_paints`,{sort:`.data`}).then(resp =>{
                TotalPaints=0;
                for(var i in resp){
                        TotalPaints +=resp[i].data
                }
        });

        TCW = await db.fetch(`NTC_${userID}_containers_WOLVES`);
        TCL = await db.fetch(`NTC_${userID}_containers_LIONS`);
        TCB = await db.fetch(`NTC_${userID}_containers_BEARS`);

        if(!TCW) TCW = 0
        if(!TCL) TCL = 0
        if(!TCB) TCB = 0

        Crystals = numberFormatter("#,##0.##",Crystals)
        Supplies = numberFormatter("#,##0.##",Supplies)
        Scores = numberFormatter("#,##0.##",Scores)
        TotalPaints = numberFormatter("#,##0.##",TotalPaints)

        TCW = parseInt(TCW)
        TCL = parseInt(TCL)
        TCB = parseInt(TCB)
        TotalContainers = TCW +TCL + TCB;

        TCW = numberFormatter("#,##0.##",TCW)
        TCL = numberFormatter("#,##0.##",TCL)
        TCB = numberFormatter("#,##0.##",TCB)
 
        TotalContainers = numberFormatter("#,##0.##",TotalContainers)

        if(player)
        {
                UserIcon = player.user.avatarURL;
        }
        else{
                UserIcon = message.member.user.avatarURL
        }

        let Embed = new Discord.RichEmbed()
        .setAuthor(UserName+' Profile',UserIcon)
        .setThumbnail(UserIcon)
        .setColor("#00bca3")
        .addField('Inventory',`
**Crystals** : *${Crystals}*
**Total Crates** : *${TotalContainers}*
**Total Paints** : *${TotalPaints}*
----------------------`,true)
        .addField('Ratings',`
**Level** : *${Level}*
**Score** : *${Scores}*

----------------------`,true)
        .addField('Paints',`
**Common** : *${CT}*
**Rare** : *${RT}*
**Epic** : *${ET}*
**Legendary** : *${LT}*
**Artifact** : *${AT}*
**WarMedal** : *${WT}*
----------------------`,true)
        .addField('Containers',`
**Wolves** : *${TCW}*
**Lions** : *${TCL}*
**Bears** : *${TCB}*
----------------------`,true)
        .setFooter(`Hint: ${prefix}paints --> Display all your paints`);

        message.channel.send(Embed);
    

}
module.exports.help = {
    name : "profile"
}