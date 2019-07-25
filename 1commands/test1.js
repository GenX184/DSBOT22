const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");

module.exports.run = async (bot,message,args) => {

    let OpenUserID = message.author.id
  
    if(message.author.id != '292675388180791297')
    {
        return //if(message.guild.id != '442704155644264450') return
    }
    let textfile = JSON.parse(fs.readFileSync("AGameBase/TextFile.json","utf8"));
    let container = JSON.parse(fs.readFileSync("ADataBase/NewCrates.json","utf8"));
    let paintName = JSON.parse(fs.readFileSync("ADataBase/PaintNameDB.json","utf8"));
    let paints = JSON.parse(fs.readFileSync("ADataBase/PaintsDB.json","utf8"));
    let containerPrice = JSON.parse(fs.readFileSync("ADataBase/ContainerPrice.json","utf8"));
    let paintPrices = JSON.parse(fs.readFileSync("ADataBase/PaintPrices.json","utf8"));
    let prefix = Prefix.prefix;
  
    //await db.add(`MTC_${OpenUserID}`,-1,{target: `.totalpaints`})

    // messageArray = message.content.split(' ')
    // var ContainerName = messageArray[1];
    // var ContainerNameArray = Object.keys(container)
    // if(!ContainerName) return message.channel.send(`**Please Mention a Container Name**\n\`Wolves | Lions | Bears \`\n**Usage :** \`${prefix}open <container-name>\`\n**Example :** \`${prefix}buy Wolves\``);
    // ContainerName = matchSorter(ContainerNameArray,ContainerName)

    // bot.Prices = async () => {
    //     DP = containerPrice['WOLVES']
    //     WNC = await db.fetch(`NTC_BOT_containers_WOLVES`)
    //     LNC = await db.fetch(`NTC_BOT_containers_LIONS`)
    //     BNC = await db.fetch(`NTC_BOT_containers_BEARS`)
    //     WNC = parseInt(WNC)
    //     LNC = parseInt(LNC)
    //     BNC = parseInt(BNC)
    //     DP = parseInt(DP)
    //     await db.startsWith(`NTC_BOT_containers`,{sort:`.data`}).then(resp =>{
    //             TC=0;
    //             for(var i in resp){
    //                     TC +=resp[i].data
    //             }
    //     }); 
    //     TC = parseInt(TC)
    //     costW = Math.round((DP + DP*(WNC/TC)*(WNC/100)) - (TC/1000)*10) 
    //     costL = Math.round((DP + DP*(LNC/TC)*(LNC/100)) - (TC/1000)*10) 
    //     costB = Math.round((DP + DP*(BNC/TC)*(BNC/100)) - (TC/1000)*10) 
    //     message.channel.send(`**Total Wolves Containers = ${WNC}\nTotal Lions Containers = ${LNC}\nTotal Bears Containers = ${BNC}\nTotal Containers = ${TC}**`)
    //     message.channel.send(`**Wolves Sell Price = ${costW}\nLions Sell Price = ${costL}\nBears Sell Price = ${costB}**`)
    // };
    // await bot.Prices()
    message.channel.send('Fixing Complete')

}
module.exports.help = {
    name : "mims#10"
}