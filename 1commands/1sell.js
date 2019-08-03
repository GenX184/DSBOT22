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
    userID = message.author.id

    let textfile = JSON.parse(fs.readFileSync("AGameBase/TextFile.json","utf8"));
    //let container = JSON.parse(fs.readFileSync("ADataBase/Containers.json","utf8"));
    let container = JSON.parse(fs.readFileSync("ADataBase/NewCrates.json","utf8"));
    let paintName = JSON.parse(fs.readFileSync("ADataBase/PaintNameDB.json","utf8"));
    let paints = JSON.parse(fs.readFileSync("ADataBase/PaintsDB.json","utf8"));
    let containerPrice = JSON.parse(fs.readFileSync("ADataBase/ContainerPrice.json","utf8"));
    let paintPrices = JSON.parse(fs.readFileSync("ADataBase/PaintPrices.json","utf8"));
    let prefix = Prefix.prefix;

    messageArray = message.content.split(' ')
    var PaintName = messageArray[1];
    var amount = messageArray[2]
    if(!PaintName) return message.channel.send(`\\❗️**Please Mention a Paint Name**\n\\❗️**Usage #1 :** \`${prefix}sell <paint-name> <amount>\`\n\\❗️**Example :** \`${prefix}sell first-love 1\`\n\n\\❗️**Usage #2 :** \`${prefix}sell <grade-name> \`\n\\❗️**Example :** \`${prefix}sell common\`\n*<grade-name> :* \`common | rare | epic | legendary | artifact\``);
    GPaintName = PaintName.toLowerCase()
 
    if(GPaintName === 'common' || GPaintName === 'rare' || GPaintName === 'epic' || GPaintName === 'legendary' || GPaintName === 'artifact' || GPaintName === 'warmedal')
    {
        PaintName = [undefined]
        spaminterval = 5
    }
    else
    {
        if(!PaintName) return message.channel.send(`\\❗️**Please Mention a Paint Name**\n\\❗️**Usage #1 :** \`${prefix}Nsell <paint-name> <amount>\`\n\\❗️**Example :** \`${prefix}sell first-love 1\`\n\\❗️**Usage #2 :** \`${prefix}sell <grade-name> \`\n\\❗️**Example :** \`${prefix}sell common\``);
        
        var PaintNameArray = Object.keys(paintName)
        PaintName = matchSorter(PaintNameArray,PaintName)

        if(PaintName[0] === undefined) return message.channel.send(`**\`${messageArray[1]}\` paint doesn't exist !!**`);
        if(!amount) amount = 1;
        if(amount != parseInt(amount)) return message.channel.send(`\\❗️**Please Mention a amount**\n\\❗️**Usage :** \`${prefix}sell ${PaintName[0]} <amount>\`\n\\❗️**Example :** \`${prefix}sell ${PaintName[0]} 1\``);
        spaminterval = 10
    }


    let Suser = message.author
    //let spaminterval = 15
        if (Suser.Sell) {
            if (new Date().getTime() - Suser.Sell < spaminterval*1000) {
                spams(message,Suser.Sell,spaminterval)
                return;
            }
            else { Suser.Sell = new Date().getTime()}
        }
        else { Suser.Sell = new Date().getTime()}

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

        // console.log(PaintID)
        // console.log(`TGP = ${TGP}`)
        // console.log(`TP = ${TP}`)
        // console.log(`NP = ${NP}`)
        cost = Math.round(DP + DP * (TGP/NP) * 0.1) - ((TP/TGP) * 10)

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

    bot.load = async (IDs,Datas) => {
        for(var i in IDs)
        {
            if(Datas[i]>0)
            {
                Price = await bot.market(IDs[i])
                TotalPaints += Datas[i]
                TotalAmount += Price * Datas[i] 
            }
        }
    };

    bot.confirmation = async (message, limit = 30000) => {
    const filter = m => m.author.id === message.author.id;
    //await message.channel.send('\n');
        try {
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
        return collected.first().content;
        } catch (e) {
        return false;
        }
    };

    let profile = await db.fetch(`MTC_${userID}`,{target : '.username'}) 
    if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)

    if(PaintName[0] != undefined)
    {
        PaintID = paintName[PaintName[0]].id
        PaintType = paints[PaintID].Grade
        Price = await bot.market(PaintID)
        if(Price === "No Sale") return message.channel.send('\\❌**This Paint Cannot be sold !!**\\❌')
        UserPaintAmount = await db.fetch(`NTC_${userID}_paints_${PaintType}_${PaintID}`)
        console.log(Price)
        if(UserPaintAmount === undefined) UserPaintAmount = 0
        if(UserPaintAmount<amount || UserPaintAmount<=0 || amount<=0) return message.channel.send(`\\❌**You do not have sufficient amount of ${PaintName[0]} paint**\\❌`)

        total = amount * Price
        total = parseInt(total)
        amount = parseInt(amount)
        await db.add(`MTC_${userID}`,total,{target: `.crystals`})
        await db.subtract(`MTC_${userID}`,amount,{target: `.totalpaints`})
        await db.subtract(`NTC_${userID}_paints_${PaintType}_${PaintID}`,amount)
        CrystalsFormat = numberFormatter("#,##0.##", total);
        message.channel.send(`\\✔️**You have sold ${amount} ${PaintName[0]} for ${CrystalsFormat} crystals**\\✔️`)
    }
    else
    {
        if(GPaintName === 'common') pin = 'C'
        if(GPaintName === 'rare') pin = 'R'
        if(GPaintName === 'epic') pin = 'E'
        if(GPaintName === 'legendary') pin = 'L'
        if(GPaintName === 'artifact') pin = 'A'
        if(GPaintName === 'warmedal') pin = 'W'
        TotalAmount = 0 ,  TotalPaints = 0
        IDs = [] , Datas = [] , j=0 , Price = []
        await db.startsWith(`NTC_${userID}_paints_${pin}`,{target:`.data`}).then(resp=>{

            for(var i in resp)
            {
                PaintID = resp[i].ID.split('_')[4]
                if(resp[i].data>0)
                {
                    console.log(PaintID +' = '+resp[i].data)
                    Datas[j] = resp[i].data
                    IDs[j] = resp[i].ID.split('_')[4]
                    j+=1
                }
            }
        })

        for(var i in IDs)
        {
            if(Datas[i]>0)
            {
                Price[i] = await bot.market(IDs[i])
            }
        }
        for(var i in IDs)
        {
            if(Datas[i]>0)
            {
                TotalPaints += Datas[i]
                TotalAmount += Price[i] * Datas[i] 
            }
        }

        TotalPaints = parseInt(TotalPaints)
        TotalAmount = parseInt(TotalAmount)
        if(TotalPaints <=0) return  message.channel.send(`\\❌**You do not have any ${GPaintName.toUpperCase()} paints**\\❌`)
        CrystalsFormat = numberFormatter("#,##0.##", TotalAmount);
        message.channel.send('**Shop Menu**\n\n```md\n#Confirmation-Message\n====================\nDo you want to sell '+TotalPaints+' '+GPaintName.toUpperCase()+' Paints for '+CrystalsFormat+' crystals ```\n**Type `yes` to confirm your transaction**')
        
        confirm = await bot.confirmation(message)
        if(confirm === false) return message.channel.send(textfile['QPaintWiki'].NoEntry)
        confirm = confirm.toLowerCase()
        ConfirmTotalPaints=0;
        ConfirmTotalAmount=0;
        if(confirm === 'y' || confirm === 'yes') 
        {
        await db.startsWith(`NTC_${userID}_paints_${pin}`,{target:`.data`}).then(resp=>{

            for(var i in resp)
            {
                PaintID = resp[i].ID.split('_')[4]
                if(resp[i].data>0)
                {
                    db.subtract(`NTC_${userID}_paints_${pin}_${PaintID}`,resp[i].data)
                }
            }
            db.add(`MTC_${userID}`,TotalAmount,{target: `.crystals`})
            db.subtract(`MTC_${userID}`,TotalPaints,{target: `.totalpaints`})
            CrystalsFormat = numberFormatter("#,##0.##", TotalAmount);
            return message.channel.send('\\✔️**Transaction has been Successful**\\✔️\nSold **'+TotalPaints+' '+GPaintName.toUpperCase()+'** paints for **'+CrystalsFormat+'** crystals')
        })            
        }
        else return message.channel.send(`\\❌**Transaction has been Canceled**\\❌`)
    }
}
module.exports.help = {
    name : "sell"
}