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
        if (Suser.CratesSpam) {
            if (new Date().getTime() - Suser.CratesSpam < spaminterval*1000) {
                spams(message,Suser.CratesSpam,spaminterval)
                return;
            }
            else { Suser.CratesSpam = new Date().getTime()}
        }
        else { Suser.CratesSpam = new Date().getTime()}

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

        TCW = await db.fetch(`NTC_${userID}_containers_WOLVES`);
        TCL = await db.fetch(`NTC_${userID}_containers_LIONS`);
        TCB = await db.fetch(`NTC_${userID}_containers_BEARS`);

        if(!TCW) TCW = 0
        if(!TCL) TCL = 0
        if(!TCB) TCB = 0

        TCW = parseInt(TCW)
        TCL = parseInt(TCL)
        TCB = parseInt(TCB)
        TotalContainers = TCW + TCL + TCB;

        TCW = numberFormatter("#,##0.##",TCW)
        TCL = numberFormatter("#,##0.##",TCL)
        TCB = numberFormatter("#,##0.##",TCB)

        let Embed = new Discord.RichEmbed()
        .setColor("#4dff4d")
        .addField(`${UserName} Containers `,`
**Wolves \t:** **__${TCW}__**
**Lions \t:** **__${TCL}__**
**Bears \t:** **__${TCB}__**
**Total Containers :** **__${TotalContainers}__**`); 

        message.channel.send(Embed)

}
module.exports.help = {
    name : "containers"
}