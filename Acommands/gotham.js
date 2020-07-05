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

var DBnitro = new db.table(`DBnitro`);
var DBnitroEntries = new db.table(`DBnitroEntries`);


module.exports.run = async (bot,message,args) => {

    if(message.author.id != '292675388180791297') return

    function clean(text) {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }

    //if (message.content.startsWith(prefix + "eval")) {
        //message.delete();
        if(message.author.id !== '292675388180791297') return;
        try {
        const code = args.join(" ");
        let evaled = eval("(async () => {" + code + "})()");

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    //}

}
module.exports.help = {
    name : "gotham"
}
