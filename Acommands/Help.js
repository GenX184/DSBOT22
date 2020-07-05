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

    let Suser = message.author
    let spaminterval =2
    if (Suser.HelpSpam) {
        if (new Date().getTime() - Suser.HelpSpam < spaminterval*1000) {
            spams(message,Suser.HelpSpam,spaminterval)
            return;
        }
        else { Suser.HelpSpam = new Date().getTime()}
    }
    else { Suser.HelpSpam = new Date().getTime()}

    HelpUserID = message.author.id 
    HelpUserName = message.author.username

    let Customprefix = Prefix.prefix

    helpmsg = `**:scroll: Bot Commands :scroll: **\`\`\`md
#Genral-Commands:
* ${Customprefix}bot        - < Bot Help >
* ${Customprefix}bot invite - < Bot Invite-Link >
* ${Customprefix}bot ping   - < Bot Ping >
* ${Customprefix}bot prefix - < Bot Custom-Prefix >
* ${Customprefix}bot server - < Bot Server-Link >
* ${Customprefix}bot vote   - < Bot Vote-Link >
* ${Customprefix}quotes     - < Quotes >
\`\`\`\`\`\`md
#Tanki-Online-Commands:
* ${Customprefix}ratings    - < User-Ratings >
\`\`\`\`\`\`md
#Economy-Commands:
* ${Customprefix}open       - < Open Container >
* ${Customprefix}buy        - < Buy Container >
* ${Customprefix}profile    - < Check Profile >
* ${Customprefix}inv        - < Check Inventory >
* ${Customprefix}paints     - < Paint Menu >
* ${Customprefix}skins      - < Skin Menu >
* ${Customprefix}prestige   - < Prestige Level >
* ${Customprefix}daily      - < Daily Reward >
* ${Customprefix}weekly     - < Weekly Reward >
* ${Customprefix}top        - < Leaderboard Help >   
\`\`\`
    `
    //* ${Customprefix}gift     - < Gift Help >

    message.channel.send(helpmsg)

}
module.exports.help = {
    name : "help",
    desc : "Shows all general commands",
    aliases:"h"
}