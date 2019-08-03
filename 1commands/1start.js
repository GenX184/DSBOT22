const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");


module.exports.run = async (bot,message,args) => {

    // if(message.author.id != '292675388180791297')
    // {
    //     if(message.guild.id != '442704155644264450') return
    // }
    userName = message.author.username
    StartUserID = message.author.id

    let Suser = message.author
    let spaminterval =3
        if (Suser.StartCheck) {
            if (new Date().getTime() - Suser.StartCheck < spaminterval*1000) {
                spams(message,Suser.StartCheck,spaminterval)
                return;
            }
            else { Suser.StartCheck = new Date().getTime()}
        }
        else { Suser.StartCheck = new Date().getTime()}

    user = await db.fetch(`MTC_${StartUserID}`)

    if(!user)
    { 
        let NewProfile = {
        username: `${userName}`,
        id: `${StartUserID}`,
        crystals: 10000,
        supplies:0,
        score: 0,
        level: 1,
        totalpaints: 0,
        roles:
        {
            admin:0,
            helper:0,
            engineer:0
        }
    }

    db.set(`MTC_${StartUserID}`,NewProfile)
    db.set(`NTC_${StartUserID}_containers_WOLVES`,5);
    db.set(`NTC_${StartUserID}_containers_LIONS`,5);
    db.set(`NTC_${StartUserID}_containers_BEARS`,5);
    db.add(`NTC_BOT_containers_WOLVES`,5);
    db.add(`NTC_BOT_containers_LIONS`,5);
    db.add(`NTC_BOT_containers_BEARS`,5);
    console.log(`${userName} Profile Created`)
    return message.channel.send(`\✔️**${userName} , Your Profile has been created**\✔️`)
    }
    else
      
    {
        return message.channel.send(`\❌**${userName} , Your Profile already exist **\❌`)
    }
  
}
module.exports.help = {
    name : "start"
}