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

var DBachievements = new db.table(`DBachievements`);

module.exports.run = async (bot,message,args) => {

    //if(message.author.id != '292675388180791297') return

    let gifts = JSON.parse(fs.readFileSync("DataBase/DB_Gift.json","utf8"));
    let prefix = Prefix.prefix;
    let player = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    //console.log(player.id)
    if(player)
    {
         ProfileID = player.id
         ProfileUserName = player.user.username
    }
    else{
        ProfileID = message.author.id
        ProfileUserName = message.author.username
    }
      //console.log(ProfileID)
    // ProfileID = `681344320539721748`
    // ProfileName = `Homi`
    let Suser = message.author
    let spaminterval =10
        if (Suser.ProfileSpam) {
            if (new Date().getTime() - Suser.ProfileSpam < spaminterval*1000) {
                spams(message,Suser.ProfileSpam,spaminterval)
                return;
            }
            else { Suser.ProfileSpam = new Date().getTime()}
        }
        else { Suser.ProfileSpam = new Date().getTime()}

    let profile = await DBprofile.fetch(`TC_${ProfileID}`,{target : '.username'}) 
    if(player)
    {
            if(!profile) return message.channel.send(`**:file_folder: | ${ProfileUserName} does not have a Profile yet**`)
    }
    else{
            if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)
    }

    console.log(`Request for ${ProfileUserName} Profile`)

        Level = await DBlevel.fetch(`TC_${ProfileID}`,{target:`.level`})

        CheckNull = async(Data)=>{
                Count=0
                if(Data===null || Data===undefined) return 0
                else return Object.values(Data).filter(a=>a==true).length
        }

        data =  await DBprofile.fetch(`TC_${ProfileID}`)
        if(!data.username)
        {
                return message.channel.send(`**:file_folder: | ${ProfileUserName} does not have a Profile yet**`)
        }
        Ndata = Object.keys(data)

        Prestige = data.prestige
        Containers = data.containers
        Crystals = data.crystals
        Supplies = data.supplies
        Scores = data.score
        Tankicoins = data.tankicoins
        Achievements = await DBachievements.fetch(`TC_${ProfileID}`,{target:`.achievements`})
        Collections = await DBcollections.fetch(`TC_${ProfileID}`,{target:`.collections`})
        if(Collections == null) Collections=0
        if(Achievements == null) Achievements=0

        if(Ndata.includes(`Paints`)===true && data.Paints !=null)
        {
                Npaints = Object.keys(data.Paints)
                if(Npaints.includes('U') === true)         U = await CheckNull(data.Paints.U)
                else U = 0
                if(Npaints.includes('R') === true)         R = await  CheckNull(data.Paints.R)
                else R = 0
                if(Npaints.includes('E') === true)         E = await CheckNull(data.Paints.E)
                else E = 0
                if(Npaints.includes('L') === true)         L = await CheckNull(data.Paints.L)
                else L = 0
                if(Npaints.includes('A') === true)         A = await CheckNull(data.Paints.A)
                else A = 0
                if(Npaints.includes('P') === true)         P = await CheckNull(data.Paints.P)
                else P = 0  

                Paints = U+R+E+L+A+P
        }else{
                U = 0
                R = 0
                E = 0
                L = 0
                A = 0
                P = 0
                Paints = 0    
        }   

        if(Ndata.includes(`Skins`)===true && data.Skins !=null)
        {
                Nskins = Object.keys(data.Skins)
                if(Nskins.includes('XT') === true)         XT = await CheckNull(data.Skins.XT)
                else XT = 0
                if(Nskins.includes('LC') === true)         LC = await CheckNull(data.Skins.LC)
                else LC = 0
                if(Nskins.includes('DC') === true)         DC = await CheckNull(data.Skins.DC)
                else DC = 0
                if(Nskins.includes('PR') === true)         PR = await CheckNull(data.Skins.PR)
                else PR = 0
                if(Nskins.includes('UC') === true)         UC = await CheckNull(data.Skins.UC)
                else UC = 0

                Skins = XT+LC+DC+PR+UC
        }else{
                XT = 0
                LC = 0
                DC = 0
                PR = 0
                UC = 0
                Skins = 0    
        }   

        Items = Paints + Skins

        function emoji(id) {
                return bot.emojis.get(id).toString();
        }

        TANE = emoji('665108249833504798') // Tankicoins
        CRYE = emoji('661474074618363905') // Crystals
        CONE = emoji('661473896591130625') // Container
        SUPE = emoji('661473925812977664') // Supplies
        SKNE = emoji('661475345333223444') // Skins
        PANE = emoji('661475317801812008') // Paints
        ITEE = emoji(`672361400772853770`) // Items
        ADMINE = emoji('664466130655641613') //ADMIN EMOTE

        SCE = emoji('661477110518513674') // Score
        ACE = emoji('661477110598336512') // Achievements
        LVE = emoji('661477111038738432') // Level
        PSE = emoji('661477110749331466') // Prestige

        Crystals = numberFormatter("#,##0.##",Crystals)
        Supplies = numberFormatter("#,##0.##",Supplies)
        Scores = numberFormatter("#,##0.##",Scores)
        Paints = numberFormatter("#,##0.##",Paints)
        Tankicoins = numberFormatter("#,##0.##",Tankicoins)

        dataGift = await DBgift.fetch(`TC_${ProfileID}`,{target:`.Gifts`});
        GiftArray = []
        GiftArrayEmoji = []
        dataGiftObject = Object.keys(dataGift)
        GiftJson = Object.keys(gifts)
        for(a in dataGiftObject)
        {
                for(b in GiftJson)
                {
                        if(dataGift[`${dataGiftObject[a]}`]!=null)
                        {
                                if(dataGift[`${dataGiftObject[a]}`].GiftID===GiftJson[b]){                               
                                        if(!GiftArray[GiftJson[b]]){
                                                GiftArray[GiftJson[b]] = 1;  
                                                GiftArrayEmoji[GiftJson[b]] = emoji(gifts[`${GiftJson[b]}`].emoji)+` ${gifts[`${GiftJson[b]}`].name}`
                                        }else{
                                                GiftArray[GiftJson[b]]++;
                                        }
                                }
                        }
                }
        }
        GiftMessage = ''
        for(a in GiftArray){
                GiftMessage = GiftMessage + `**${GiftArrayEmoji[a]}**: *${GiftArray[a]}*\n`
        }
 
        if(player)
        {
                UserIcon = player.user.avatarURL;
        }
        else{
                UserIcon = message.member.user.avatarURL
        }
  
        let Embed = new Discord.RichEmbed()
        .setAuthor(ProfileUserName+' Profile',UserIcon)
        .setThumbnail(UserIcon)
        .setColor("#00FFDA")    
        .addField('Ratings',`
**Level** : *${Level}*
**Score** : *${Scores}*
**Prestige** : *${Prestige}*
        `) 
//         **Achievements** : *${Achievements}*
//          **Collections** : *${Collections}*
        .addField('Inventory',`
**${TANE} Tankioins** : *${Tankicoins}*
**${CRYE} Crystals** : *${Crystals}*
**${SUPE} Supplies** : *${Supplies}*
**${ITEE} Items** : *${Items}*
**${CONE} Containers** : *${Containers}*
`,true)
 //       .addField(`Gifts Recieved`,`${GiftMessage}`,true)  
        .setFooter(`${prefix}inv to see your inventory`);
  
          let EmbedAdmin = new Discord.RichEmbed()
        .setAuthor(ProfileUserName+' Profile',UserIcon)
        .setTitle(`**${ADMINE} BOT ADMIN ${ADMINE}**`)
        .setThumbnail(UserIcon)
        .setColor("#00FFDA")    
        .addField('Ratings',`
**Level** : *${Level}*
**Score** : *${Scores}*
**Prestige** : *${Prestige}*
        `) 
//         **Achievements** : *${Achievements}*
//          **Collections** : *${Collections}*
        .addField('Inventory',`
**${TANE} Tankioins** : *${Tankicoins}*
**${CRYE} Crystals** : *${Crystals}*
**${SUPE} Supplies** : *${Supplies}*
**${ITEE} Items** : *${Items}*
**${CONE} Containers** : *${Containers}*
`,true)
 //       .addField(`Gifts Recieved`,`${GiftMessage}`,true)  
        .setFooter(`${prefix}inv to see your inventory`);

        rolePerm = await DBrole.fetch(`TC_${message.author.id}`,{target:`.Tier1`})
        if(rolePerm===true) message.channel.send(EmbedAdmin);
        else message.channel.send(Embed);

}
module.exports.help = {
        name : "profile",
        desc : "Check your Profile",
        aliases: "p"
}