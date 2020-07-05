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
var DBidle = new db.table("DBidle");
var DBgift = new db.table(`DBgift`);
var DBstats = new db.table("DBstats");
var DBlevel = new db.table("DBlevel");
var DBrole = new db.table("DBBotRole");
var DBserver = new db.table(`DBserver`);
var DBprofile = new db.table("DBprofile");
var DBcollections = new db.table("DBcollections");
var DBguildSetting = new db.table("DBguildSetting");

module.exports.run = async (bot, message, args) => {
  if (message.author.id != "292675388180791297") return;

  if (args[0]) code = args[0].toLowerCase();
  code = args[0];
  let player =
    message.guild.member(message.mentions.users.last()) ||
    message.guild.members.get(args[2]);
  if (player) {
    UserID = player.id;
    UserName = player.user.username;
  } else {
    UserID = message.author.id;
    UserName = message.author.username;
  }
  switch (code) {
    case "set":
      if (args[1]) {
        code = args[1].toLowerCase();
        if (code === `true`)
          DBrole.set(`TC_${UserID}`, true, { target: `.Tier1` }).then(
            message.reply(`**${UserName} has been set to Tier1**`)
          );
        else if (code === `false`)
          DBrole.set(`TC_${UserID}`, false, { target: `.Tier1` })
            .then(
              message.channel.send(
                `**${UserName} has been removed from Tier1**`
              )
            )
            .delete();
      }
      break;
    case "check":
      A = await DBrole.fetch(`TC_${UserID}`, { target: `.Tier1` });
      message.channel.send(`**${UserName} status ${A}**`);
      break;
  }
};
module.exports.help = {
  name: "role",
  desc: "Role Command"
};
