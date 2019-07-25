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
        if (Suser.CrysSpam) {
            if (new Date().getTime() - Suser.CrysSpam < spaminterval*1000) {
                spams(message,Suser.CrysSpam,spaminterval)
                return;
            }
            else { Suser.CrysSpam = new Date().getTime()}
        }
        else { Suser.CrysSpam = new Date().getTime()}

    let profile = await db.fetch(`MTC_${userID}`,{target : '.username'}) 
    if(player)
    {
            if(!profile) return message.channel.send(`**:file_folder: | ${player.displayName} does not have a Profile yet**`)
    }
    else{
            if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)
    }
    
        data =  await db.fetch(`MTC_${userID}`)
        UserName = message.author.username
        Crystals = data.crystals
        Crystals = numberFormatter("#,##0.##",Crystals)

        let Embed = new Discord.RichEmbed()
        .setColor(`#6ca1f7`)
        .addField(`${UserName} Crystals`,`**Crystals :** **__${Crystals}__**`); 

        message.channel.send(Embed);
}
module.exports.help = {
    name : "crystals"
}