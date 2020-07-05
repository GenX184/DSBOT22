const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
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


module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {

    if(message.author.id != '292675388180791297')
    {
        return //if(message.author.id != '443649136881827850') return
    }
    
    if(!args[0]) value = 0
    else value = args[0]
    count = 0
    await DBprofile.startsWith(`TC`,{target :`.data`}).then(resp => {
        message.channel.send(`Player Names :`)
        for(var i in resp){
          if(resp[i].data.score<=value){
            count++
          }
        }
        message.channel.send(`Total number of players with Less than ${value} score : ${count}`)
    })
  
    //await DBprofile.set(`TC_689167709497196580`,2819900,{target:`.crystals`}).then(message.channel.send(`Changed profile`))

}
module.exports.help = {
    name : "fixDB"
}