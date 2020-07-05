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

    message.delete()
    rolePerm = await DBrole.fetch(`TC_${message.author.id}`,{target:`.Tier1`})
    if(rolePerm!=true) return
    //if(message.author.id != '292675388180791297') return
    AdminGuildID = message.guild.id
    GuildCount = bot.guilds.map(g =>g.name).length
    MemberListGA = []
    OverallTankicoins = 0
    OverallCrystals = 0
    OverallSupplies = 0
    OverallContainers = 0
    OverallScores = 0
    OverallPaints = 0
    OverallSkins = 0

    A = await DBprofile.startsWith(`TC`,{target:`.data`}).then(resp=>{
        TotalPlayers = resp.length
        for(a in resp)
        {
            if(resp[a].data.crystals) OverallCrystals+= resp[a].data.crystals
            if(resp[a].data.tankicoins) OverallTankicoins+= resp[a].data.tankicoins
            if(resp[a].data.supplies) OverallSupplies+= resp[a].data.supplies
            if(resp[a].data.containers) OverallContainers+= resp[a].data.containers
            if(resp[a].data.score) OverallScores+= resp[a].data.score
            if(resp[a].data.paints) OverallPaints+= resp[a].data.paints
            if(resp[a].data.skins) OverallSkins+= resp[a].data.skins
        }

        TotalPlayers = numberFormatter("#,##0.##", TotalPlayers);
        OverallCrystals = numberFormatter("#,##0.##", OverallCrystals);
        OverallTankicoins = numberFormatter("#,##0.##", OverallTankicoins);
        OverallSupplies = numberFormatter("#,##0.##", OverallSupplies);
        OverallContainers = numberFormatter("#,##0.##", OverallContainers);
        OverallScores = numberFormatter("#,##0.##", OverallScores);
        OverallPaints = numberFormatter("#,##0.##", OverallPaints);
        OverallSkins = numberFormatter("#,##0.##", OverallSkins);

        function emoji(id) {
            return bot.emojis.get(id).toString();
    }

    TANE = emoji('665108249833504798') // Tankicoins
    CRYE = emoji('661474074618363905') // Crystals
    CONE = emoji('661473896591130625') // Container
    SUPE = emoji('661473925812977664') // Supplies
    SKNE = emoji('661475345333223444') // Skins
    PANE = emoji('661475317801812008') // Paints

    SCE = emoji('661477110518513674') // Score
    ACE = emoji('661477110598336512') // Achievements
    LVE = emoji('661477111038738432') // Level
    PSE = emoji('661477110749331466') // Prestige

        let Gstats = new Discord.RichEmbed()
        .setTitle('TankiCrates Database Stats')
        .addField('**Total Players**',`***${TotalPlayers}***`)
        .addField('**Guild Counts**',`***${GuildCount}***`)
        .setColor(`#FE00FF`)
        .addField('Overall Stats',`
**${TANE} Tankoins :** *${OverallTankicoins}*   
**${CRYE} Crystals :** *${OverallCrystals}*      
**${SUPE} Supplies :** *${OverallSupplies}*   
**${CONE} Containers :** *${OverallContainers}*   
**${SCE} Scores :** *${OverallScores}*  
**${PANE} Paints :** *${OverallPaints}*   
**${SKNE} Skins :** *${OverallSkins}*   
        `)
        .setFooter(`${moment().format('lll')}`)

        message.channel.send(Gstats)
    })


}
module.exports.help = {
    name : "statsTC",
    aliases: "stc"
}