const Discord = require("discord.js");
const fs = require("fs");
const Prefix = require("../prefix.json");
const db = require("quick.db");
const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")

module.exports.run = async (bot,message,args) => {
    
    let textfile = JSON.parse(fs.readFileSync("AGameBase/TextFile.json","utf8"));
    let container = JSON.parse(fs.readFileSync("ADataBase/NewCrates.json","utf8"));
    let paintName = JSON.parse(fs.readFileSync("ADataBase/PaintNameDB.json","utf8"));
    let paints = JSON.parse(fs.readFileSync("ADataBase/PaintsDB.json","utf8"));
    let containerPrice = JSON.parse(fs.readFileSync("ADataBase/ContainerPrice.json","utf8"));
    let prefix = Prefix.prefix;

    if(message.author.id != '292675388180791297') return;
    let messageArray = message.content.split(' ')
    var Z = []
    let item = messageArray[1]
    let value = messageArray[2]
    if(!item) return message.reply('Item not entered')
    if(!value) return message.reply('Value not entered')
    item = item.toLowerCase()
    if(item === 'score' || item === 'crystals' || item === 'supplies')
    { console.log('Item Exist Continue') }
    else return message.reply('Item Does Not Exist')
    if(value != parseInt(value)) return message.reply('Value entered is not a integer')
    if(value<0 || value>10000000) return message.reply(`${value} cannot be set`)

    bot.checking = async (dataID,item,value) => {
        try {
        value = parseInt(value)
        await db.set(`MTC_${dataID}`,value,{target:`.${item}`})
        } catch (e) {
        return message.reply('ERROR');
        }
    };

    A = await db.startsWith(`MTC`,{sort:'.data'}).then(resp => {
        for(var i in resp)
        {
            console.log('ID: '+resp[i].data.id+' Name: '+resp[i].data.username)
            Z[i] = resp[i].data.id
        }
    });
    for(var i in Z)
    {
        if(item === 'bronze') item = 'containers.BRONZE'
        if(item === 'silver') item = 'containers.SILVER'
        if(item === 'gold') item = 'containers.GOLD'
        if(item === 'diamond') item = 'containers.DIAMOND'
        await bot.checking(Z[i],item,value) 
    }
    item = item.split('.').pop()
    message.reply(`Set ${value} ${item} for All Users`)
    //if(value>=0) message.reply(`Added ${value} ${item} for All Users`)
    //if(value<0) message.reply(`Removed ${value} ${item} for All Users`)
}
module.exports.help = {
    name : "setall"
}