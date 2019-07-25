const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");

module.exports.run = async (bot,message,args) => {
    
    // if(message.author.id != '292675388180791297')
    // {
    //     if(message.guild.id != '442704155644264450') return
    // }
    buyUserID = message.author.id

    let textfile = JSON.parse(fs.readFileSync("AGameBase/TextFile.json","utf8"));
    let container = JSON.parse(fs.readFileSync("ADataBase/NewCrates.json","utf8"));
    let paintName = JSON.parse(fs.readFileSync("ADataBase/PaintNameDB.json","utf8"));
    let paints = JSON.parse(fs.readFileSync("ADataBase/PaintsDB.json","utf8"));
    let containerPrice = JSON.parse(fs.readFileSync("ADataBase/ContainerPrice.json","utf8"));
    let paintPrices = JSON.parse(fs.readFileSync("ADataBase/PaintPrices.json","utf8"));
    let prefix = Prefix.prefix;

    messageArray = message.content.split(' ')
    var ContainerName = messageArray[1];
    if(!ContainerName) return message.channel.send(`\`❗️\`**Please Mention a Container Name**\`❗️\`\n\`Wolves | Lions | Bears \`\n\`❗️\`**Usage :** \`${prefix}buy <container-name>\`\n\`❗️\`**Example :** \`${prefix}buy Wolves\``);
    Option = ContainerName.toLowerCase()
    if(ContainerName != 'prices')
    {
        var ContainerNameArray = Object.keys(container)
        ContainerName = matchSorter(ContainerNameArray,ContainerName)
    }
    else 
    {
        Option=== 'prices'
    }

    let Suser = message.author
    let spaminterval = 5
        if (Suser.Buy) {
            if (new Date().getTime() - Suser.Buy < spaminterval*1000) {
                spams(message,Suser.Buy,spaminterval)
                return;
            }
            else { Suser.Buy = new Date().getTime()}
        }
        else { Suser.Buy = new Date().getTime()}

    let profile = await db.fetch(`MTC_${buyUserID}`,{target : '.username'}) 
    if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)

    bot.Prices = async () => {
        DP = containerPrice['WOLVES']
        WNC = await db.fetch(`NTC_BOT_containers_WOLVES`)
        LNC = await db.fetch(`NTC_BOT_containers_LIONS`)
        BNC = await db.fetch(`NTC_BOT_containers_BEARS`)
        WNC = parseInt(WNC)
        LNC = parseInt(LNC)
        BNC = parseInt(BNC)
        DP = parseInt(DP)
        await db.startsWith(`NTC_BOT_containers`,{sort:`.data`}).then(resp =>{
                TC=0;
                for(var i in resp){
                        TC +=resp[i].data
                }
        }); 
        TC = parseInt(TC)
        costW = Math.round((DP + DP*(WNC/TC)*(WNC/100)) - (TC/1000)*10) 
        costL = Math.round((DP + DP*(LNC/TC)*(LNC/100)) - (TC/1000)*10) 
        costB = Math.round((DP + DP*(BNC/TC)*(BNC/100)) - (TC/1000)*10) 
        //message.channel.send(`**Total Wolves Containers = ${WNC}\nTotal Lions Containers = ${LNC}\nTotal Bears Containers = ${BNC}\nTotal Containers = ${TC}**`)
        message.channel.send(`**Wolves Container Buy Price = ${costW}\nLions Container Buy Price = ${costL}\nBears Container Buy Price = ${costB}**`)
    };

    if(Option === 'prices')
    {
        return bot.Prices();
    }

    bot.market = async (ContainerName) => {
        DP = containerPrice[ContainerName]
        NC = await db.fetch(`NTC_BOT_containers_${ContainerName}`)
        NC = parseInt(NC)
        DP = parseInt(DP)
        await db.startsWith(`NTC_BOT_containers`,{sort:`.data`}).then(resp =>{
                TC=0;
                for(var i in resp){
                        TC +=resp[i].data
                }
        }); 
        TC = parseInt(TC)
        cost = Math.round((DP + DP*(NC/TC)*(NC/100)) - (TC/1000)*10) 
        if(cost > 10000) cost = 10000
        return cost 
    };

    bot.confirmation = async (message, question, limit = 30000) => {
    const filter = m => m.author.id === message.author.id;
    await message.channel.send('**Shop Menu**\n```md\n'+question+'```\n**Type `yes` to confirm your transaction**');
        try {
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
        return collected.first().content;
        } catch (e) {
        return false;
        }
    };

    bot.buy = async (message, question, limit = 20000) => {
    const filter = m => m.author.id === message.author.id;
    await message.channel.send('**Shop Menu**\t\t['+ContainerName+' Container]\n'+'```md\n'+question+'\n\nType "exit" to exit the Shop Menu\n=================================```')
    
        try {
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
        return collected.first().content;
        } catch (e) {
        return false;
        }
    };


    cost = await bot.market(ContainerName)
    if(!cost)  return message.channel.send(`\`❗️\`**Please Mention a Container Name**\`❗️\`\n\`Wolves | Lions | Bears \`\n\`❗️\`**Usage :** \`${prefix}buy <container-name>\`\n\`❗️\`**Example :** \`${prefix}buy Wolves\``);
    Q = 'Please select an option from below :\n====================================\n'
    var total = []
    var j = 1;
    P = [1,5,15,30,50]
    for(var i in P)
    {
        total[j] = Math.round(cost * P[i])
        if(i === '0') Q = Q + `\n${j}.  [x${P[i]}]  `+ Normal(total[j])
        if(i === '1') Q = Q + `\n${j}.  [x${P[i]}]  `+ Normal(total[j])
        if(i === '2') Q = Q + `\n${j}.  [x${P[i]}]  `+ Normal(total[j])
        if(i === '3') Q = Q + `\n${j}.  [x${P[i]}]  `+ Normal(total[j])
        if(i === '4') Q = Q + `\n${j}.  [x${P[i]}]  `+ Normal(total[j])
        //Q = Q + `\n${j}.  [x${P[i]}]  `+ Discount(total[j],15)  ~~~~> Discount Function
        
        j+=1;
    }
    opt = await bot.buy(message,Q)
    if(opt === 'exit') return message.channel.send(textfile['QPaintWiki'].exit)
    if(opt === false) return message.channel.send(textfile['QPaintWiki'].NoEntry)
    if(!(opt>=1 && opt<6)) return message.channel.send(textfile['QPaintWiki'].InvalidEntry)

    CrystalsFormat = numberFormatter("#,##0.##", total[opt]);
    Q = `#Confirmation-Message:\n====================\nDo you want to buy ${P[opt - 1]} ${ContainerName[0].toUpperCase()} Containers for ${CrystalsFormat} Crystals?`
    
    UserCry = await db.fetch(`MTC_${buyUserID}`,{target: `.crystals`})
    if(UserCry<total[opt]) return message.channel.send(`**You do not have sufficient amount of crystals**`)
    
    confirm = await bot.confirmation(message, Q)
    if(confirm === false) return message.channel.send(textfile['QPaintWiki'].NoEntry)
    confirm = confirm.toLowerCase()

    if(confirm === 'y' || confirm === 'yes') 
    {
        await db.subtract(`MTC_${buyUserID}`,total[opt],{target: `.crystals`})
        await db.add(`NTC_${buyUserID}_containers_${ContainerName[0].toUpperCase()}`,P[opt - 1]);
        await db.add(`NTC_BOT_containers_${ContainerName[0].toUpperCase()}`,P[opt - 1]);
        message.channel.send(`\`✔️\`**Transaction has been Successful**\`✔️\`\nYou have brought **__${P[opt - 1]} ${ContainerName[0].toUpperCase()}__** containers for **__${CrystalsFormat}__** crystals`)
    }
    else
    {
        return message.channel.send(`\`❌\`**Transaction has been Canceled**\`❌\``)
    }

    function Discount(total,percentage) {
        CrystalsFormat = numberFormatter("#,##0.##", total)
        total = total - (total * (percentage/100))
        OCrystalsFormat = numberFormatter("#,##0.##", total)
        return `<—❌${CrystalsFormat}❌ = ✅${OCrystalsFormat}✅ = ${percentage}% Discount—>`
    }

    function Normal(total) {
        CrystalsFormat = numberFormatter("#,##0.##", total)
        return `<—✅${CrystalsFormat}✅—>`
    }


}
module.exports.help = {
    name : "buy"
}