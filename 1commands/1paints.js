const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");


module.exports.run = async (bot,message,args) => {

    //if(message.author.id != '292675388180791297')
    // {
    //     if(message.guild.id != '442704155644264450') return
    // }
    let textfile = JSON.parse(fs.readFileSync("AGameBase/TextFile.json","utf8"));
    //let container = JSON.parse(fs.readFileSync("ADataBase/Containers.json","utf8"));
    let container = JSON.parse(fs.readFileSync("ADataBase/NewCrates.json","utf8"));
    let paintName = JSON.parse(fs.readFileSync("ADataBase/PaintNameDB.json","utf8"));
    let paints = JSON.parse(fs.readFileSync("ADataBase/PaintsDB.json","utf8"));
    let containerPrice = JSON.parse(fs.readFileSync("ADataBase/ContainerPrice.json","utf8"));
    let paintPrices = JSON.parse(fs.readFileSync("ADataBase/PaintPrices.json","utf8"));
    let prefix = Prefix.prefix;

    let messageArray = message.content.split(' ');
    let player = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(player)
    {
            PaintMenu = messageArray[2]
            PaintsUserID = player.id
    }
    else{
            PaintMenu = messageArray[1]
            PaintsUserID = message.author.id
    }

    let Suser = message.author
    let spaminterval =10
        if (Suser.PaintSpam) {
            if (new Date().getTime() - Suser.PaintSpam < spaminterval*1000) {
                spams(message,Suser.PaintSpam,spaminterval)
                return;
            }
            else { Suser.PaintSpam = new Date().getTime()}
        }
        else { Suser.PaintSpam = new Date().getTime()}

    let profile = await db.fetch(`MTC_${PaintsUserID}`,{target : '.username'}) 
    if(player)
    {
            if(!profile) return message.channel.send(`**:file_folder: | ${player.displayName} does not have a Profile yet**`)
    }
    else{
            if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)
    }

        bot.market = async (PaintID) => {
        pin = paints[PaintID].Grade
        DP = paintPrices[pin]
        NP = await db.fetch(`NTC_BOT_paints_${pin}_${PaintID}`)
        NP = parseInt(NP)
        DP = parseInt(DP)
        A = await db.startsWith(`NTC_BOT_paints_${pin}`,{sort:`.data`}).then(resp =>{
                TGP=0;
                for(var i in resp){
                        TGP +=resp[i].data
                }
        }); 
        TGP = parseInt(TGP)
        B = await db.startsWith(`NTC_BOT_paints`,{sort:`.data`}).then(resp =>{
                TP=0;
                for(var i in resp){
                        TP +=resp[i].data
                }
        }); 
        TP = parseInt(TP)

        if(!NP) NP = 1;
        if(!TGP) TGP = 1;
        if(!TP) TP = 1;

        cost = Math.round(DP + DP * (TGP/NP) * 0.1) - ((TP/TGP) * 10)
        // console.log(`PaintID = ${PaintID}`)
        // console.log(`TGP = ${TGP}`)
        // console.log(`TP = ${TP}`)
        // console.log(`NP = ${NP}`)
        // console.log(`cost = ${cost}`)

        if(pin === 'C') if(cost > 10000) cost = 10000
        if(pin === 'R') if(cost > 25000) cost = 25000
        if(pin === 'E') if(cost > 50000) cost = 50000
        if(pin === 'L') if(cost > 100000) cost = 100000
        if(pin === 'A') if(cost > 250000) cost = 250000
        if(pin === 'W') if(cost > 1000000) cost = 1000000

        if(pin === 'C') if(cost < 10) cost = 10
        if(pin === 'R') if(cost < 250) cost = 250
        if(pin === 'E') if(cost < 500) cost = 500
        if(pin === 'L') if(cost < 1000) cost = 1000
        if(pin === 'A') if(cost < 25000) cost = 25000
        if(pin === 'W') if(cost < 50000) cost = 50000

        //console.log(cost)
        return cost 
    };

    bot.Page = async (message, question, limit = 60000) => {
    const filter = m => m.author.id === message.author.id;
    await message.channel.send(question);
            try {
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
            return collected.first().content;
            } catch (e) {
            return false;
            }
    };

    bot.Display = async (CAT, Val,profile) => {
    UserPaintID = [] 
    UserPaintAmount = [] 
    j=1;
    await db.startsWith(`NTC_${PaintsUserID}_paints_${CAT}`,{target:`.data`}).then(resp=>{
        for(var i in resp)
        {
                if(resp[i].data > 0)
                {
                        PID = resp[i].ID.split('_')[4]
                        UserPaintID[j] = PID
                        UserPaintAmount[j] = resp[i].data
                        j+=1
                }
        }
         if(!(Val>=1 && Val<(UserPaintID.length))) return //message.channel.send(textfile['QInventory'].InvalidEntry)
        PaintID =  UserPaintID[Val]  
        PaintName = paints[PaintID].name
        PaintURL = paints[PaintID].URL
        PaintType = paints[PaintID].Grade
        if(!UserPaintAmount[Val]) UserPaint = 0
        else UserPaint = UserPaintAmount[Val]

        if(PaintType === 'C') PaintType = 'Common'
        if(PaintType === 'R') PaintType = 'Rare'
        if(PaintType === 'E') PaintType = 'Epic'
        if(PaintType === 'L') PaintType = 'Legendary'
        if(PaintType === 'A') PaintType = 'Artifacts'
        if(PaintType === 'S') PaintType = 'Special'
        if(PaintType === 'W') PaintType = 'WarMedal'

        let Embed = new Discord.RichEmbed()
        .setAuthor('Paint Wiki')
        .addField(`${PaintName} - ${PaintType}`,`**${profile} has ${UserPaint} of these**`)
        .setImage(PaintURL);

        message.channel.send(Embed)         
        });
    };

    bot.Paint = async (message, Page,limit = 60000) => {
    const filter = m => m.author.id === message.author.id;
    msg = '@Please "select a number from below options ex: type 1";\n',j=1,k=0;
    UserPaintID = [] 

    if(Page === '1'){ CAT = 'C',CATN = 'Common'}
    if(Page === '2'){ CAT = 'R',CATN = 'Rare'}
    if(Page === '3'){ CAT = 'E',CATN = 'Epic'}
    if(Page === '4'){ CAT = 'L',CATN = 'Legendary'}
    if(Page === '5'){ CAT = 'A',CATN = 'Artifact'}
    if(Page === '6'){ CAT = 'W',CATN = 'WarMedal'}

    IDs = [] , j=0
    await db.startsWith(`NTC_${PaintsUserID}_paints_${CAT}`,{target:`.data`}).then(resp=>{
        for(var i in resp)
        {
                IDs[j] = resp[i].ID.split('_')[4]
                j+=1
        }
    })
    PSellPrice = [] , j=0
    for(var i in IDs)
    {
            PSellPrice[j] = await bot.market(IDs[i])
            j+=1
    }
    j=1;
    await db.startsWith(`NTC_${PaintsUserID}_paints_${CAT}`,{target:`.data`}).then(resp=>{
        for(var i in resp)
        {
                PID = resp[i].ID.split('_')[4]
                PAmount = resp[i].data
                PName = paints[PID].name
                //console.log(PSellPrice[i])
                PSellPrice[i] = Math.round(PSellPrice[i])
                PSellPrice[i] = numberFormatter("#,##0.##", PSellPrice[i]);
                if(PAmount>0)
                {
                        msg = msg + `\n[${j}] <${PAmount} x ${PSellPrice[i]}🔹 ${PName} >`
                        UserPaintID[j] = PID
                        j=j+1
                        k=1
                }
        }
        if(k===0) return  message.channel.send('**You do dont have any paint of this grade**') 
        message.channel.send("**Paint Menu**\n```less\n"+msg+"\n\n#Type [exit] to close the menu```")
    });
        try {
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
        return collected.first().content;
        } catch (e) {
        return false;
        }
    }

    Page = await bot.Page(message,textfile['QInventory'].Qpage)
    if(Page === 'exit') return message.channel.send(textfile['QInventory'].exit)
    if(Page === false) return message.channel.send(textfile['QInventory'].NoEntry)
    if(!(Page>=1 && Page<7)) return message.channel.send(textfile['QInventory'].InvalidEntry)

    if(Page === '1'){ CAT = 'C',CATN = 'Common'}
    if(Page === '2'){ CAT = 'R',CATN = 'Rare'}
    if(Page === '3'){ CAT = 'E',CATN = 'Epic'}
    if(Page === '4'){ CAT = 'L',CATN = 'Legendary'}
    if(Page === '5'){ CAT = 'A',CATN = 'Artifact'}
    if(Page === '6'){ CAT = 'W',CATN = 'WarMedal'}

    var Val = await bot.Paint(message,Page)
    if(Val === 'exit') return message.channel.send(textfile['QInventory'].exit)
    if(Val === false) return message.channel.send(textfile['QInventory'].NoEntry)
    if(Val != parseInt(Val)) return //message.channel.send(textfile['QInventory'].InvalidEntry)
    Val = parseInt(Val)
    await bot.Display(CAT,Val,profile);

}
module.exports.help = {
    name : "paints"
}