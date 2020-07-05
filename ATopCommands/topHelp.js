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

module.exports = async (bot,message,args,DBguildSetting ) => {

    TopHelpUserID = message.author.id 
    TopHelpUserName = message.author.username

    let Customprefix = Prefix.prefix

    msgHead = `Commands: `
    msg = ''
    msg = msg + ` \`${Customprefix}top global crystals\`  **Global Top Crystals**`
    msg = msg + ` \n \`${Customprefix}top global scores\`  **Global Top Scores**`
    msg = msg + ` \n \`${Customprefix}top global supplies\`  **Global Top Supplies**`
    msg = msg + ` \n \`${Customprefix}top server\`  **Server Top Scores**`

    TopHelpEmbed = new Discord.RichEmbed()
    .setFooter(`Requested by ${TopHelpUserName}`)
    .setTitle(`Leaderboard Commands`)
    .setColor(`#FF00AA `)
    .addField(`${msgHead}`,`${msg}`)

    message.channel.send(TopHelpEmbed)
}
