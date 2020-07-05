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

module.exports.run = async (bot,message,args) => {

    let Suser = message.author
    let spaminterval =1
    if (Suser.QuotesSpam) {
        if (new Date().getTime() - Suser.QuotesSpam < spaminterval*1000) {
            spams(message,Suser.QuotesSpam,spaminterval)
            return;
        }
        else { Suser.QuotesSpam = new Date().getTime()}
    }
    else { Suser.QuotesSpam = new Date().getTime()}

    QuoteUserName = message.author.username
    QuoteUserIcon = message.member.user.avatarURL

    let quotes = JSON.parse(fs.readFileSync("DataBase/Quotes.json","utf8"));
    quotesObject = Object.values(quotes.quotes)
    randcode = Math.floor(Math.random() * quotesObject.length)

    let QuoteEmbed = new Discord.RichEmbed()
    .setAuthor(`Quote`)
    .setDescription(`
"***${quotesObject[randcode]}***"`)
    .setColor(`#74139e`)
    //.setFooter(`Requested by ${QuoteUserName}`,QuoteUserIcon)

    message.channel.send(QuoteEmbed)

}
module.exports.help = {
    name : "quotes",
    aliases:"quo",
    desc : "Shows all quotes commands"
}