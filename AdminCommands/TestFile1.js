const BigSpams = require("../BigSpam.js");
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const moment = require("moment");
const db = require("quick.db");
const fs = require("fs");

var DBnitro = new db.table(`DBnitro`);
var DBnitroEntries = new db.table(`DBnitroEntries`);

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
var DBachievements = new db.table(`DBachievements`);

module.exports.run = async (bot,message,args,DBprofile,DBstats,DBachievements,DBlevel,DBrole,DBidle,DBguildSetting,DBgift,DBserver) => {

    if(message.author.id != '292675388180791297') return

    UserID = message.author.id
    NEWUSERID = `682230912930545772` // New Kami
    UserID = `585606270061641728` //Old Kami
    // await DBprofile.startsWith(`TC_${UserID}`,{target:`.data`}).then(resp=>{
    //       for(a in resp){
    //        console.log(resp[a])
    //       }
    // }).then(`Search Complete`)
//   PROFILE = await DBprofile.fetch(`TC_${UserID}`)
//   LEVEL = await DBlevel.fetch(`TC_${UserID}`)
//   IDLE = await DBidle.fetch(`TC_${UserID}`)
//   ROLE = await DBrole.fetch(`TC_${UserID}`)
//   GIFT = await DBgift.fetch(`TC_${UserID}`)
   
//   DBprofile.set(`TC_${NEWUSERID}`,PROFILE).then(console.log(`PROFILE TRANSFERED`))
//   DBlevel.set(`TC_${NEWUSERID}`,LEVEL).then(console.log(`LEVEL TRANSFERED`))
//   DBidle.set(`TC_${NEWUSERID}`,IDLE).then(console.log(`IDLE TRANSFERED`))
//   DBrole.set(`TC_${NEWUSERID}`,ROLE).then(console.log(`ROLE TRANSFERED`))
//   DBgift.set(`TC_${NEWUSERID}`,GIFT).then(console.log(`GIFT TRANSFERED`))
  
}
module.exports.help = {
    name : "file1"
}