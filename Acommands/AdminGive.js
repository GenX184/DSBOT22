const pre = require("../Auto_commands/prestigePOP.js");
const numberFormatter = require("number-formatter");
const BigSpams = require("../BigSpam.js");
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const moment = require("moment");
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

module.exports.run = async (bot,message,args) => {

    rolePerm = await DBrole.fetch(`TC_${message.author.id}`,{target:`.Tier1`})
    if(rolePerm===true){
    message.delete()
    if(args[0] === "help"){
        message.channel.send(`**Admin Help Command**
\`${Prefix.prefix}admin addcon <containers> @mention\` **MAX LIMIT:500**
\`${Prefix.prefix}admin addcry <crystals> @mention\`  **MAX LIMIT:100000000**
\`${Prefix.prefix}admin addsup <supplies> @mention\` **MAX LIMIT:100000000**
\`${Prefix.prefix}admin addtnk <tankoins> @mention\`  **MAX LIMIT:1000**
\`${Prefix.prefix}admin delcon <containers> @mention\` **MAX LIMIT:500**
\`${Prefix.prefix}admin delcry <crystals> @mention\` **MAX LIMIT:100000000**
\`${Prefix.prefix}admin delsup <containers> @mention\` **MAX LIMIT:100000000**
\`${Prefix.prefix}admin deltnk <crystals> @mention\` **MAX LIMIT:1000**
        `)
      return 
    }
    let player = message.guild.member(message.mentions.users.last()) || message.guild.members.get(args[2]);
    if(player)
    {
        UserID = player.id
        UserName = player.user.username
    }
    else{
        UserID = message.author.id
        UserName = message.author.username
    }

    let profile = await DBprofile.fetch(`TC_${UserID}`) 
    if(player)
    {
            if(!profile) return message.channel.send(`**:file_folder: | ${UserName} does not have a Profile yet**`)
    }
    else{
            if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)
    }

    Item = args[0]
    if(!Item) return 
    Value = parseInt(args[1])
    if(!Value) return 
    switch(Item)
    {
        case "addcon": if(Value>500) return message.channel.send(`**MAX LIMIT : 500**`)
                        await DBprofile.add(`TC_${UserID}`,Value,{target:`.containers`})
                     message.channel.send(`**${Value} containers added to ${UserName} profile**`)
                     console.log(`**${Value} containers added to ${UserName} profile**`)
            break;
        case "addcry": 
                    if(Value>100000000) return message.channel.send(`**MAX LIMIT : 100000000**`)
                    await DBprofile.add(`TC_${UserID}`,Value,{target:`.crystals`})
                    await DBstats.add(`TC_${UserID}`,Value,{target:`.crystals`})
                     message.channel.send(`**${Value} crystals added to ${UserName} profile**`)
                    console.log(`**${Value} crystals added to ${UserName} profile**`)
            break;
        case "addsup": 
                    if(Value>100000000) return message.channel.send(`**MAX LIMIT : 100000000**`)
                    await DBprofile.add(`TC_${UserID}`,Value,{target:`.supplies`})
                    await DBstats.add(`TC_${UserID}`,Value,{target:`.supplies`})
                    message.channel.send(`**${Value} supplies added to ${UserName} profile**`)
                    console.log(`**${Value} supplies added to ${UserName} profile**`)
        break;
        case "addtnk": 
                    if(Value>100000000) return message.channel.send(`**MAX LIMIT : 1000**`)
                    await DBprofile.add(`TC_${UserID}`,Value,{target:`.tankicoins`})
                    await DBstats.add(`TC_${UserID}`,Value,{target:`.tankicoins`})
                    message.channel.send(`**${Value} tankicoins added to ${UserName} profile**`)
                    console.log(`**${Value} tankicoins added to ${UserName} profile**`)
        break;
        case "setcon": await DBprofile.set(`TC_${UserID}`,Value,{target:`.containers`})
                     message.channel.send(`**Set ${Value} containers to ${UserName} profile**`)
                      console.log(`**${Value} containers added to ${UserName} profile**`)
            break;
        case "setcry": await DBprofile.set(`TC_${UserID}`,Value,{target:`.crystals`})
                     message.channel.send(`**Set ${Value} crystals to ${UserName} profile**`)
                      console.log(`**${Value} crystals added to ${UserName} profile**`)
            break;  
        case "setsup": await DBprofile.set(`TC_${UserID}`,Value,{target:`.supplies`})
                     message.channel.send(`**Set ${Value} supplies to ${UserName} profile**`)
                      console.log(`**${Value} supplies added to ${UserName} profile**`)
            break;
        case "settnk": await DBprofile.set(`TC_${UserID}`,Value,{target:`.tankicoins`})
                     message.channel.send(`**Set ${Value} tankicoins to ${UserName} profile**`)
                      console.log(`**${Value} tankicoins added to ${UserName} profile**`)
            break;  
        case "delcon":   Val = await DBprofile.fetch(`TC_${UserID}`,{target:`.containers`})
                        if(Value>500) return message.channel.send(`**MAX LIMIT : 500**`)
                        if(Value >Val) return message.channel.send('**Does not have that many containers**')
                        await DBprofile.subtract(`TC_${UserID}`,Value,{target:`.containers`})
                        message.channel.send(`**${Value} containers removed from ${UserName} profile**`)
                        console.log(`**${Value} containers added to ${UserName} profile**`)
            break;
        case "delcry":   Val = await DBprofile.fetch(`TC_${UserID}`,{target:`.crystals`})
                        if(Value>100000000) return message.channel.send(`**MAX LIMIT : 100000000**`)
                        if(Value >Val) return message.channel.send('**Does not have that many crystals**')
                        await DBprofile.subtract(`TC_${UserID}`,Value,{target:`.crystals`})
                        message.channel.send(`**${Value} crystals removed from ${UserName} profile**`)
                        console.log(`**${Value} crystals added to ${UserName} profile**`)
            break;  
        case "delsup":   Val = await DBprofile.fetch(`TC_${UserID}`,{target:`.supplies`})
                        if(Value>500) return message.channel.send(`**MAX LIMIT : 500**`)
                        if(Value >Val) return message.channel.send('**Does not have that many supplies**')
                        await DBprofile.subtract(`TC_${UserID}`,Value,{target:`.supplies`})
                        message.channel.send(`**${Value} supplies removed from ${UserName} profile**`)
                        console.log(`**${Value} supplies added to ${UserName} profile**`)
            break;
        case "deltnk":   Val = await DBprofile.fetch(`TC_${UserID}`,{target:`.tankicoins`})
                        if(Value>100000000) return message.channel.send(`**MAX LIMIT : 100000000**`)
                        if(Value >Val) return message.channel.send('**Does not have that many tankicoins**')
                        await DBprofile.subtract(`TC_${UserID}`,Value,{target:`.tankicoins`})
                        message.channel.send(`**${Value} tankicoins removed from ${UserName} profile**`)
                        console.log(`**${Value} tankicoins added to ${UserName} profile**`)
            break;      
    }
    }
    else return message.channel.send('**Not Authorized**').then(msg => {msg.delete(1000)})
}
module.exports.help = {
    name : "admin"
}