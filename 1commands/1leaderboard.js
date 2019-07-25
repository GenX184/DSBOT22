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
    //     if(message.author.id != '443649136881827850') return
    // }

    LeaderboardUserID = message.author.id
    let textfile = JSON.parse(fs.readFileSync("AGameBase/TextFile.json","utf8"));
    let container = JSON.parse(fs.readFileSync("ADataBase/NewCrates.json","utf8"));
    let paintName = JSON.parse(fs.readFileSync("ADataBase/PaintNameDB.json","utf8"));
    let paints = JSON.parse(fs.readFileSync("ADataBase/PaintsDB.json","utf8"));
    let containerPrice = JSON.parse(fs.readFileSync("ADataBase/ContainerPrice.json","utf8"));
    let prefix = Prefix.prefix;

    const CrystalsSet = new Set();
    const SuppliesSet = new Set();
    const PaintsSet = new Set();
    const ScoreSet = new Set();
    messageArray = message.content.split(' ')
    code = messageArray[1]
    if(!code) return message.channel.send(`**Please Mention which Leaderboard to Display **\n\`Scores | Paints | Crystals \`\n**Usage :** \`${prefix}top <type-name>\`\n**Example :** \`${prefix}top Crystals\``);
    code = code.toLowerCase()
    code1 = messageArray[2]

    let Suser = message.author
    let spaminterval =10
        if (Suser.LeaderBoardSpam) {
            if (new Date().getTime() - Suser.LeaderBoardSpam < spaminterval*1000) {
                spams(message,Suser.LeaderBoardSpam,spaminterval)
                return;
            }
            else { Suser.LeaderBoardSpam = new Date().getTime()}
        }
        else { Suser.LeaderBoardSpam = new Date().getTime()}

    let profile = await db.fetch(`MTC_${LeaderboardUserID}`,{target : '.username'}) 
    if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)
    switch (code) {
        case 'crystals':     
                        score = [],temp = [],Name = [],z=0,sl=1;
                        rank = -1
                        A = await db.startsWith(`MTC`,{sort:'.data'}).then(resp => {
                            for(var i in resp)
                            {
                                if(resp[i].data.crystals >=-9999 ) 
                                {
                                    if(resp[i].ID === 'MTC_undefined') 
                                    {
                                        message.channel.send('Updating Ranking .. Try the command Again').then(m=>m.delete(7000))
                                        db.delete('MTC_undefined')
                                    }
                                    Name[z] = resp[i].data.id
                                    score[z] = resp[i].data.crystals
                                    temp[z] = resp[i].data.crystals
                                    z+=1;
                                }
                            }
                        })
                            for (i=0; i < score.length; i++){
                                for (j=0, stop=score.length-i; j < stop; j++){
                                    if (score[j] > score[j+1]){
                                    swap(score, j, j+1);
                                    }
                                }
                            }
                        A = '🏆 | Top 10 Most Crystals\n-----------------------------------------------\n'
                        for(i=(score.length-1);i>=0;i--)
                        {
                            for(var j in temp)
                            {

                                if(score[i] === temp[j])
                                {
                                    if(!CrystalsSet.has(Name[j]))
                                    {
                                        CrystalsSet.add(Name[j])
                                        if(sl<=10)
                                        {
                                            ValueFormater = numberFormatter("#,##0.##", temp[j]);
                                            MeMber = await bot.fetchUser(Name[j])
                                            Names = MeMber.username.replace(' ',"-")
                                            if(sl === 1) A = A + `🥇 <${Names}\n\t\t\t\t\t\t\tCrystals = ${ValueFormater}>\n`
                                            if(sl === 2) A = A + `🥈 <${Names}\n\t\t\t\t\t\t\tCrystals = ${ValueFormater}>\n`
                                            if(sl === 3) A = A + `🥉 <${Names}\n\t\t\t\t\t\t\tCrystals = ${ValueFormater}>\n`
                                            if(sl>3) A = A + `${sl}. <${Names}\n\t\t\t\t\t\t\tCrystals = ${ValueFormater}>\n`
                                        }
                                        sl+=1;
                                        if(Name[j] === message.author.id) save = j,rank = sl - 1
                                    }
                                }
                            }
                        }
                        CrystalsSet.clear();
                        B = '```md\n'+A+'**-------------------------------------------**\n'
                        if(rank > 0)
                        {
                            ValueFormater = numberFormatter("#,##0.##", temp[save]);
                            B= B +'<Your Rank <'+rank+'> \t\t\t<Crystals = '+ValueFormater+'>```'; 
                        }
                        else B = B + '```';
                        message.channel.send(B);
                        //})
        break;
        case 'supplies123':     
                        score = [],temp = [],Name = [],z=0,sl=1;
                        rank = -1
                        A = await db.startsWith(`MTC`,{sort:'.data'}).then(resp => {
                            for(var i in resp)
                            {   
                                if(resp[i].data.supplies >=0)
                                {          
                                    if(resp[i].ID === 'MTC_undefined') 
                                    {
                                        message.channel.send('Updating Ranking .. Try the command Again').then(m=>m.delete(7000))
                                        db.delete('MTC_undefined')
                                    }                                  
                                Name[z] = resp[i].data.id
                                score[z] = resp[i].data.supplies
                                temp[z] = resp[i].data.supplies
                                z+=1
                                }
                            }
                            })
                            for (i=0; i < score.length; i++){
                                for (j=0, stop=score.length-i; j < stop; j++){
                                    if (score[j] > score[j+1]){
                                    swap(score, j, j+1);
                                    }
                                }
                            }
                        A = '🏆 | Top 10 Most Supplies\n-----------------------------------------------\n'
                        for(i=(score.length-1);i>=0;i--)
                        {
                            for(var j in temp)
                            {
                                if(score[i] === temp[j])
                                {
                                    if(!SuppliesSet.has(Name[j]))
                                    {
                                        SuppliesSet.add(Name[j])
                                        if(sl<=10)
                                        {   
                                            ValueFormater = numberFormatter("#,##0.##", temp[j]);
                                            MeMber = await bot.fetchUser(Name[j])
                                            Names = MeMber.username.replace(' ',"-")
                                            if(sl === 1) A = A + `🥇 <${Names}\n\t\t\t\t\t\t\tSupplies = ${ValueFormater}>\n`
                                            if(sl === 2) A = A + `🥈 <${Names}\n\t\t\t\t\t\t\tSupplies = ${ValueFormater}>\n`
                                            if(sl === 3) A = A + `🥉 <${Names}\n\t\t\t\t\t\t\tSupplies = ${ValueFormater}>\n`
                                            if(sl>3) A = A + `${sl}. <${Names}\n\t\t\t\t\t\t\tSupplies = ${ValueFormater}>\n`
                                        }
                                        sl+=1;
                                        if(Name[j] === message.author.id) save = j,rank = sl - 1
                                    }
                                }
                            }
                        }
                        SuppliesSet.clear();
                        ValueFormater = numberFormatter("#,##0.##", temp[save]);
                        B = '```md\n'+A+'**-------------------------------------------**\n'
                        if(rank > 0) B= B +'<Your Rank <'+rank+'> \t\t\t<Supplies = '+ValueFormater+'>```';
                        else B = B + '```';
                        message.channel.send(B);
        break;
        case 'paints': 
                        score = [],temp = [],Name = [],z=0,sl=1;
                        rank = -1
                        A = await db.startsWith(`MTC`,{sort:'.data'}).then(resp => {
                            for(var i in resp)
                            {   
                                if(resp[i].data.totalpaints >=0)
                                {    
                                    if(resp[i].ID === 'MTC_undefined') 
                                    {
                                        message.channel.send('Updating Ranking .. Try the command Again').then(m=>m.delete(7000))
                                        db.delete('MTC_undefined')
                                    }     
                                Name[z] = resp[i].data.id
                                score[z] = resp[i].data.totalpaints
                                temp[z] = resp[i].data.totalpaints
                                z+=1
                                }
                            }
                            })
                            for (i=0; i < score.length; i++){    
                                for (j=0, stop=score.length-i; j < stop; j++){
                                    if (score[j] > score[j+1]){
                                    swap(score, j, j+1);
                                    }
                                }
                            }
                        A = '🏆 | Top 10 Most Paints\n-----------------------------------------------\n'
                        for(i=(score.length-1);i>=0;i--)
                        {
                            for(var j in temp)
                            {
                                // console.log('this is score[i] = '+score[i])  
                                // console.log('this is temp[j] = '+temp[j])  
                                if(score[i] === temp[j])
                                {
                                    if(!PaintsSet.has(Name[j]))
                                    {
                                        PaintsSet.add(Name[j])
                                        if(sl<=10)
                                        {
                                            ValueFormater = numberFormatter("#,##0.##", temp[j]);
                                            MeMber = await bot.fetchUser(Name[j])
                                            Names = MeMber.username.replace(' ',"-")
                                            if(sl === 1) A = A + `🥇 <${Names}\n\t\t\t\t\t\t\tPaints = ${ValueFormater}>\n`
                                            if(sl === 2) A = A + `🥈 <${Names}\n\t\t\t\t\t\t\tPaints = ${ValueFormater}>\n`
                                            if(sl === 3) A = A + `🥉 <${Names}\n\t\t\t\t\t\t\tPaints = ${ValueFormater}>\n`
                                            if(sl>3) A = A + `${sl}. <${Names}\n\t\t\t\t\t\t\tPaints = ${ValueFormater}>\n`
                                        }
                                        sl+=1;                                        
                                        if(Name[j] === message.author.id) save = j,rank = sl - 1
                                    }
                                }
                            }
                        }
                        ValueFormater = numberFormatter("#,##0.##", temp[save]);
                        PaintsSet.clear();
                        B = '```md\n'+A+'**-------------------------------------------**\n'
                        if(rank > 0)
                        {
                            ValueFormater = numberFormatter("#,##0.##", temp[save]);
                            B= B +'<Your Rank <'+rank+'> \t\t\t<Paints = '+ValueFormater+'>```'; 
                        }
                        else B = B + '```';
                        message.channel.send(B);
        break;
        case 'scores':     
                        score = [],temp = [],Name = [],z=0,sl=1;
                        rank = -1
                        await db.startsWith(`MTC`,{sort:'.data'}).then(resp => {
                            console.log(resp)
                            for(var i in resp)
                            {
                                if(resp[i].data.score >=0)
                                {
                                    if(resp[i].ID === 'MTC_undefined') 
                                    {
                                        message.channel.send('Updating Ranking .. Try the command Again').then(m=>m.delete(7000))
                                        db.delete('MTC_undefined')
                                    }     
                                    Name[z] = resp[i].data.id
                                    score[z] = resp[i].data.score
                                    temp[z] = resp[i].data.score
                                    z+=1;
                                }
                            }
                            })
                            for (i=0; i < score.length; i++){
                                for (j=0, stop=score.length-i; j < stop; j++){
                                    if (score[j] > score[j+1]){
                                    swap(score, j, j+1);
                                    }
                                }
                            }
                        A = '🏆 | Top 10 Most Scores\n-----------------------------------------------\n'
                        for(i=(score.length-1);i>=0;i--)
                        {
                            for(var j in temp)
                            {
                                if(score[i] === temp[j])
                                {
                                    if(!ScoreSet.has(Name[j]))
                                    {
                                        ScoreSet.add(Name[j])
                                        if(sl<=10)
                                        {
                                            ValueFormater = numberFormatter("#,##0.##", temp[j]);                                            
                                            MeMber = await bot.fetchUser(Name[j])
                                            Names = MeMber.username.replace(' ',"-")
                                            if(sl === 1) A = A + `🥇 <${Names}\n\t\t\t\t\t\t\tScore = ${ValueFormater}>\n`
                                            if(sl === 2) A = A + `🥈 <${Names}\n\t\t\t\t\t\t\tScore = ${ValueFormater}>\n`
                                            if(sl === 3) A = A + `🥉 <${Names}\n\t\t\t\t\t\t\tScore = ${ValueFormater}>\n`
                                            if(sl>3) A = A + `${sl}. <${Names}\n\t\t\t\t\t\t\tScore = ${ValueFormater}>\n`
                                        }
                                        sl+=1;
                                        if(Name[j] === message.author.id) save = j,rank = sl - 1
                                    }
                                }
                            }
                        }
                        ScoreSet.clear();
                        B = '```md\n'+A+'**-------------------------------------------**\n'
                        if(rank > 0)
                        {
                            ValueFormater = numberFormatter("#,##0.##", temp[save]);
                            B= B +'<Your Rank <'+rank+'> \t\t\t<Score = '+ValueFormater+'>```'; 
                        }
                        else B = B + '```';
                        message.channel.send(B);
        break;
        default:        return message.channel.send(`**Please Mention which Leaderboard to Display **\n\`Scores | Paints | Crystals \`\n**Usage :** \`${prefix}top <type-name>\`\n**Example :** \`${prefix}top Crystals\``);
    }

    function swap(arr, first_Index, second_Index){
    var temp = arr[first_Index];
    arr[first_Index] = arr[second_Index];
    arr[second_Index] = temp;
    }

}
module.exports.help = {
    name : "top"
}