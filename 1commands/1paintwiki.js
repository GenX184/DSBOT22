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

    messageArray = message.content.split(' ');
    paint_name = messageArray[1]
    if(paint_name)
    {
        var PN = Object.keys(paintName)
        paint_name = matchSorter(PN,paint_name)
    }
    else
    {
        paint_name = [undefined]
    }

    Suser = message.author
    let spaminterval =5
        if (Suser.PaintWikiSpam) {
            if (new Date().getTime() - Suser.PaintWikiSpam < spaminterval*1000) {
                spams(message,Suser.PaintWikiSpam,spaminterval)
                return;
            }
            else { Suser.PaintWikiSpam = new Date().getTime()}
        }
        else { Suser.PaintWikiSpam = new Date().getTime()}
    
    PaintUserID = message.author.id
    let profile = await db.fetch(`MTC_${PaintUserID}`,{target : '.username'}) 
    if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)
    
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
        if(!DP) cost = 0
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

    bot.Paint = async (message, page, limit = 60000) => {
        const filter = m => m.author.id === message.author.id;

            var PName = Object.keys(paintName)
            k=1;
            pg1='\n',pg2='\n',pg3='\n',pg4='\n',pg5='\n',pg6='\n',pg7='\n',pg8='\n',pg9='\n',pg10='\n'
            pg11='\n',pg12='\n',pg13='\n',pg14='\n',pg15='\n',pg16='\n',pg17='\n',pg18='\n',pg19='\n',pg20='\n',
            pg21='\n',pg22='\n',pg23='\n',pg24='\n',pg25='\n',pg26='\n'
            for(var i in PName)
            {
                if(PName[i].startsWith('A')){ pg1 = pg1 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('B')){ pg2 = pg2 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('C')){ pg3 = pg3 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('D')){ pg4 = pg4 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('E')){ pg5 = pg5 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('F')){ pg6 = pg6 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('G')){ pg7 = pg7 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('H')){ pg8 = pg8 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('I')){ pg9 = pg9 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('J')){ pg10 = pg10 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('K')){ pg11 = pg11 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('L')){ pg12 = pg12 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('M')){ pg13 = pg13 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('N')){ pg14 = pg14 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('O')){ pg15 = pg15 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('P')){ pg16 = pg16 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('Q')){ pg17 = pg17 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('R')){ pg18 = pg18 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('S')){ pg19 = pg19 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('T')){ pg20 = pg20 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('U')){ pg21 = pg21 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('V')){ pg22 = pg22 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('W')){ pg23 = pg23 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('X')){ pg24 = pg24 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('Y')){ pg25 = pg25 + `\n<[${k}]> ${PName[i]}`}
                if(PName[i].startsWith('Z')){ pg26 = pg26 + `\n<[${k}]> ${PName[i]}`}
                k=k+1
            }

            if(page === 'A'){ question = pg1}
            if(page === 'B'){ question = pg2}
            if(page === 'C'){ question = pg3}
            if(page === 'D'){ question = pg4}
            if(page === 'E'){ question = pg5}
            if(page === 'F'){ question = pg6}
            if(page === 'G'){ question = pg7}
            if(page === 'H'){ question = pg8}
            if(page === 'I'){ question = pg9}
            if(page === 'J'){ question = pg10}
            if(page === 'K'){ question = pg11}
            if(page === 'L'){ question = pg12}
            if(page === 'M'){ question = pg13}
            if(page === 'N'){ question = pg14}
            if(page === 'O'){ question = pg15}
            if(page === 'P'){ question = pg16}
            if(page === 'Q'){ question = pg17}
            if(page === 'R'){ question = pg18}
            if(page === 'S'){ question = pg19}
            if(page === 'T'){ question = pg20}
            if(page === 'U'){ question = pg21}
            if(page === 'V'){ question = pg22}
            if(page === 'W'){ question = pg23}
            if(page === 'X'){ question = pg24}
            if(page === 'Y'){ question = pg25}
            if(page === 'Z'){ question = pg26}
                
        await message.channel.send("**Paint Menu**```CSS\n"+question+"\n\n#Type [exit] to close the men```");
        try {
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
            return collected.first().content;
            } catch (e) {
            return false;
            }
    };

    bot.PaintData = async (PaintName) => {
        PaintName = paintName[PaintName].name
        PaintID = paintName[PaintName].id
        PaintURL = paintName[PaintName].URL
        PaintType = paints[PaintID].Grade
        UserPaint = await db.fetch(`NTC_${PaintUserID}_paints_${PaintType}_${PaintID}`)
        PaintPrice = await bot.market(PaintID)
        PaintPrice = numberFormatter("#,##0.##",PaintPrice) + ' Crystals'
        if(PaintPrice === "No Sale Crystals") PaintPrice = "Yet to release"
        if(!UserPaint) UserPaint = 0

        if(PaintType === 'C') PaintType = 'Common'
        if(PaintType === 'R') PaintType = 'Rare'
        if(PaintType === 'E') PaintType = 'Epic'
        if(PaintType === 'L') PaintType = 'Legendary'
        if(PaintType === 'A') PaintType = 'Artifacts'
        if(PaintType === 'S') PaintType = 'Special'

        let Embed = new Discord.RichEmbed()
        .setAuthor('Paint Wiki')
        .addField(`${PaintName} - ${PaintType}`,`**${profile} has ${UserPaint} of these**`)
        .addField(`Paint Value`,`**${PaintPrice}**`)
        .setImage(PaintURL);

        message.channel.send(Embed)
    };

    if(paint_name[0] && paint_name[0] != undefined)
    {
        await bot.PaintData(paint_name[0])
    }
    else
    { 
        if(messageArray[1] === 'menu')
        {
            var PaintNames = Object.keys(paintName)
            Alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
            Paint = undefined

            Page = await bot.Page(message,textfile['QPaintWiki'].Qpage)
            if(Page === 'exit') return message.channel.send(textfile['QPaintWiki'].exit)
            if(Page === false) return message.channel.send(textfile['QPaintWiki'].NoEntry)
            if(Page) Page = Page.toUpperCase()
            for(var i in Alphabets)
            {
                 if(Page === Alphabets[i])
                 {
                    Paint = await bot.Paint(message,Page)
                    if(Paint === 'exit') return message.channel.send(textfile['QPaintWiki'].exit)
                    if(Paint === false) return message.channel.send(textfile['QPaintWiki'].NoEntry)
                 }
            }
            if(Paint === undefined) return message.channel.send(textfile['QPaintWiki'].InvalidEntry)
            if(!(Paint>=1 && Paint<162)) return message.channel.send(textfile['QPaintWiki'].InvalidEntry)
            PaintN = PaintNames[parseInt(Paint)-1]
            await bot.PaintData(PaintN)
        }
        else 
        {
            return message.channel.send(`**Usage #1 :** \`${prefix}paintwiki menu\`\nShows Paint-Wiki menu listing all paints\n\n**Usage #2 :** \`${prefix}paintwiki <paint-name>\`\n**Example :** \`${prefix}paintwiki Frost\``);
        }
    }
}
module.exports.help = {
    name : "paintwiki"
}