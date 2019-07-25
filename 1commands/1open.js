const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");


module.exports.run = async (bot,message,args) => {

    if(message.author.id != '292675388180791297')
    {
        spaminterval = 10
    }
    else{
        spaminterval = 5
    }

    //JSON Reasources
    let textfile = JSON.parse(fs.readFileSync("AGameBase/TextFile.json","utf8"));
    let container = JSON.parse(fs.readFileSync("ADataBase/NewCrates.json","utf8"));
    let paintName = JSON.parse(fs.readFileSync("ADataBase/PaintNameDB.json","utf8"));
    let paints = JSON.parse(fs.readFileSync("ADataBase/PaintsDB.json","utf8"));
    let containerPrice = JSON.parse(fs.readFileSync("ADataBase/ContainerPrice.json","utf8"));
    let prefix = Prefix.prefix;

    let messageArray = message.content.split(' ')
    let OpenUserID = message.author.id

    let Suser = message.author
    //let spaminterval =5
        if (Suser.ContainerSpam) {
            if (new Date().getTime() - Suser.ContainerSpam < spaminterval*1000) {
                spams(message,Suser.ContainerSpam,spaminterval)
                return;
            }
            else { Suser.ContainerSpam = new Date().getTime()}
        }
        else { Suser.ContainerSpam = new Date().getTime()}

    let profile = await db.fetch(`MTC_${OpenUserID}`,{target : '.username'}) 
    if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)

    var containerName = messageArray[1];
    if(!containerName) return message.channel.send(`\\❗️**Please Mention a Container Name**\\❗️\n\`Basic | Wolves | Lions | Bears\`\n\\❗️**Usage :** \`${prefix}open <container-name>\`\n\\❗️\**Example :** \`${prefix}open Basic\``);
    NcontainerName = containerName.toUpperCase()
    switch(NcontainerName)
    {
        case "BASIC": try{
                            var pin = Crates(10000,'C',0);
                            Picker(pin,OpenUserID,'BASIC');  
                        }
                      catch (e){
                         return message.channel.send(`**:coffee: break , Be back soon ... **`);
                      }
        break;
        case "WOLVES": try{
                            var pin = Crates(1000,'C',400,'R',150,'E',45,'L',15,'A',5,'W',0);
                            console.log(pin)
                            Picker(pin,OpenUserID,'WOLVES');  
                        }
                     catch (e){
                         return message.channel.send(`**:coffee: break , Be back soon ... **`);
                      }
        break;
        case "LIONS": try{
                            var pin = Crates(1000,'C',400,'R',150,'E',45,'L',15,'A',5,'W',0);
                            Picker(pin,OpenUserID,'LIONS');  
                        }
                      catch (e){
                         return message.channel.send(`**:coffee: break , Be back soon ... **`);
                      }
        break;
        case "BEARS": try{
                            var pin = Crates(1000,'C',400,'R',150,'E',45,'L',15,'A',5,'W',0);
                            Picker(pin,OpenUserID,'BEARS');  
                        }
                      catch (e){
                         return message.channel.send(`**:coffee: break , Be back soon ... **`);
                      }
        break;        
    }

    //Functions Initialized

    function Crates(R1,C1,R2,C2,R3,C3,R4,C4,R5,C5,R6,C6,MIN)
    {
        CODE = Math.floor(Math.random() * 1000)+1
        if(CODE<=R1 && CODE>R2) return C1
        if(CODE<=R2 && CODE>R3) return C2
        if(CODE<=R3 && CODE>R4) return C3
        if(CODE<=R4 && CODE>R5) return C4
        if(CODE<=R5 && CODE>R6) return C5
        if(CODE<=R5 && CODE>MIN) return C6
    }   

    function HexColor(pin)
    {
        if(pin === 'C') return '#adabab'  //Grey
        if(pin === 'U') return '#4040f9'  //Blue
        if(pin === 'R') return '#7fff00'  //Green
        if(pin === 'E') return '#ffdf33'  //Gold
        if(pin === 'L') return '#ff2400'  //Red
        if(pin === 'A') return '#ff34b3'  //Pink
        if(pin === 'S') return '#b701b7'  //Violet 
        if(pin === 'W') return '#4040f9'  //Blue 
    }

    function Picker(pin,OpenUserID,Container_Name)
    {
        var Cry = ['186CRY001','186CRY002','186CRY003','186CRY004','186CRY005']
        var Sup = ['186SUP001','186SUP002','186SUP003']
        done = 0;
        Crate = container[Container_Name]
        var PaintCount = Object.keys(Crate[pin])
        code = Math.floor(Math.random() * PaintCount.length)

        PaintID = PaintCount[code];
        PaintName = paints[PaintID].name
        PaintURL = paints[PaintID].URL
        PaintType = pin
        HexID = HexColor(pin);

        if(PaintType === 'C') PaintType = 'Common'
        if(PaintType === 'R') PaintType = 'Rare'
        if(PaintType === 'E') PaintType = 'Epic'
        if(PaintType === 'L') PaintType = 'Legendary'
        if(PaintType === 'A') PaintType = 'Artifacts'
        if(PaintType === 'W') PaintType = 'WarMedal'

        bot.UserData = async (OpenUserID, Container_Name, PaintID, PaintName, PaintType, HexID) => {

            UserName = await db.fetch(`MTC_${OpenUserID}`,{target: `.username`})
            UserContainers = await db.fetch(`NTC_${OpenUserID}_containers_${Container_Name}`)
            score = await Math.floor(Math.random() * 10)
        
            if(Container_Name === 'BASIC') UserContainers = 1;
            if(UserContainers>0)
            {
                for(var i in Cry){
                    if(PaintID === Cry[i])
                    {   
                        if(PaintID === '186CRY001') val = 1000;
                        if(PaintID === '186CRY002') val = 5000;
                        if(PaintID === '186CRY003') val = 25000;
                        if(PaintID === '186CRY004') val = 100000;
                        if(PaintID === '186CRY005') val = 500000;

                        await db.subtract(`NTC_${OpenUserID}_containers_${Container_Name}`,1)
                        await db.add(`MTC_${OpenUserID}`,val,{target: `.crystals`})
                        await db.add(`MTC_${OpenUserID}`,score,{target: `.score`})

                        done = 1; 
                        text1 = `Congratulations ${message.author.username}, You got ${PaintName}`
                        text2 = `**${PaintType}** `
                    }}
                for(var i in Sup){
                    if(PaintID === Sup[i])
                    {   
                        if(PaintID === '186SUP001') val = 100;
                        if(PaintID === '186SUP002') val = 500;
                        if(PaintID === '186SUP003') val = 1000;

                        await db.subtract(`NTC_${OpenUserID}_containers_${Container_Name}`,1)
                        await db.add(`MTC_${OpenUserID}`,val,{target: `.supplies`})
                        await db.add(`MTC_${OpenUserID}`,score,{target: `.score`})

                        done = 1;
                        text1 = `Congratulations ${message.author.username}, You got ${PaintName}`
                        text2 = `**${PaintType}** `
                    }}
                if(done != 1)
                {
                    console.log(PaintID)
                    { 
                        await db.subtract(`NTC_${OpenUserID}_containers_${Container_Name}`,1)
                        await db.add(`NTC_${OpenUserID}_paints_${pin}_${PaintID}`,1)
                        await db.add(`MTC_${OpenUserID}`,score,{target: `.score`})
                        await db.add(`MTC_${OpenUserID}`,1,{target: `.totalpaints`})
                        await db.add(`NTC_BOT_paints_${pin}_${PaintID}`,1)
                    }
                    text1 = `Congratulations ${message.author.username}, You got ${PaintName} Paint`
                    text2 = `Paint Grade : \`${PaintType}\` `
                }

                let newEmbed = new Discord.RichEmbed()
                .setAuthor(`${Container_Name} Container`)
                .setColor(HexID)
                .addField(text1,text2)
                .setImage(PaintURL);

                message.channel.send(newEmbed);
            }
            else {return message.channel.send(`\\❌**You do not have ${Container_Name} Containers**\\❌`)}
        };

    bot.UserData(OpenUserID, Container_Name, PaintID, PaintName, PaintType ,HexID)
    }
}
module.exports.help = {
    name : "open"
}