const Discord = require("discord.js");
const fs = require("fs");
const Prefix = require("../prefix.json");
const db = require("quick.db");
const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")

module.exports.run = async (bot,message,args) => {
    
    if(message.author.id != '292675388180791297') return;

    let textfile = JSON.parse(fs.readFileSync("AGameBase/TextFile.json","utf8"));
    let container = JSON.parse(fs.readFileSync("ADataBase/NewCrates.json","utf8"));
    let paintName = JSON.parse(fs.readFileSync("ADataBase/PaintNameDB.json","utf8"));
    let paints = JSON.parse(fs.readFileSync("ADataBase/PaintsDB.json","utf8"));
    let containerPrice = JSON.parse(fs.readFileSync("ADataBase/ContainerPrice.json","utf8"));
    let prefix = Prefix.prefix;

    let player = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    let messageArray = message.content.split(' ')
    let help = messageArray[1]
    let item = messageArray[2]
    let value = messageArray[3]
    help = help.toLowerCase()
    if(help === 'help') return message.reply('\n**Usage:** `'+prefix+'mset <mention-player> <item-name> <value>`\n*item-name:* `score | supplies | crystals | <container-name>`\n**Example:** `'+prefix+'set @mention crystals 10000`')
    if(!player) return message.reply('User not mentioned')
    if(!item) return message.reply('Item not entered')
    if(!value) return message.reply('Value not entered')
    item = item.toLowerCase()
    if(item === 'score' || item === 'crystals' || item === 'supplies' || item === 'level')
    { console.log('Item Exist Continue') }
    else return message.reply('Item Does Not Exist')
    if(value != parseInt(value)) return message.reply('Value entered is not a integer')
    //if(value<0) return message.reply('Value cannot not be under `0` ')

    bot.checking = async (dataID,item,value) => {
        try {
        value = parseInt(value)
        await db.set(`MTC_${dataID}`,value,{target:`.${item}`})
        } catch (e) {
        return message.reply('ERROR');
        }
    };

    user = await db.fetch(`MTC_${player.id}`,{target:'.id'})
    username = await db.fetch(`MTC_${player.id}`,{target:'.username'})
    if(user)
    {
        if(player.id === user)
        {
            if(item === 'bronze') item = 'containers.BRONZE'
            if(item === 'silver') item = 'containers.SILVER'
            if(item === 'gold') item = 'containers.GOLD'
            if(item === 'diamond') item = 'containers.DIAMOND'
            await bot.checking(user,item,value) 
            item = item.split('.').pop()
            message.reply(`Set ${value} ${item} for ${username}`)
            //if(value>=0) message.reply(`Set ${value} ${item} for ${username}`)
            //if(value<0) message.reply(`Removed ${value} ${item} for ${username}`)
        }
    }
    else{
        return message.reply('User Does not Exist in Database')
    }

}
module.exports.help = {
    name : "set"
}