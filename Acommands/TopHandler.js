const pre = require("../Auto_commands/prestigePOP.js");
const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter");
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

const topGlobalScore = require("../ATopCommands/topGlobalScore.js");
const topServerScore = require("../ATopCommands/topServerScore.js");
const topHelp = require("../ATopCommands/topHelp.js");
    
module.exports.run = async (bot,message,args) => {

    let Suser = message.author
    let spaminterval =5
    if (Suser.TopSpam) {
        if (new Date().getTime() - Suser.TopSpam < spaminterval*1000) {
            spams(message,Suser.TopSpam,spaminterval)
            return;
        }
        else { Suser.TopSpam = new Date().getTime()}
    }
    else { Suser.TopSpam = new Date().getTime()}

    if(args[0]) code = args[0].toLowerCase()
    code = args[0]
    switch(code)
    {
        case "global":
        case "g":  topGlobalScore(bot,message,args)
        break;
        case "s":
        case "server": topServerScore(bot,message,args)
        break;
        default: topHelp(bot,message,args,DBguildSetting)
                    console.log(`${message.author.username} Requested Leaderboard Help List`)
        break;
    }

}
module.exports.help = {
    name : "top",
    desc : "Shows all general commands"
}