const numberFormatter = require("number-formatter");
const matchSorter = require("match-sorter")
const Prefix = require("../prefix.json");
const Discord = require("discord.js");
const spams = require("../spams.js");
const db = require("quick.db");
const fs = require("fs");


module.exports.run = async (bot,message,args) => {
    
    let prefix = Prefix.prefix;
    user = message.author.id;
    user_display = message.member.displayName
    let Uicon = message.member.user.avatarURL;

    let Suser = message.author
    let spaminterval =5
        if (Suser.Help) {
            if (new Date().getTime() - Suser.Help < spaminterval*1000) {
                spams(message,Suser.Help,spaminterval)
                return;
            }
            else { Suser.Help = new Date().getTime()}
        }
        else { Suser.Help = new Date().getTime()}

message.channel.send(`
 \:clipboard: BOT COMMANDS :clipboard:\
\`\`\`md\n
#Tanki Online
1  <$rating     - Tankionline rating>
#Bot 
1  <$ping       - BOT connection to the server>
2  <$invite     - BOT Invite Link>
3  <$botstats   - BOT Stats>
4  <$gamestats  - BOT GAME stats>
2  <$joinserver - BOT Server Invite Link>
#Game 
1  <$top        - Leaderboards>
2  <$buy        - Purchase containers>
3  <$sell       - Sell paints to gain crystals>
4  <$open       - Open to win awesome paints!>
5  <$level      - Display's your level>
6  <$start      - Create your profile here>
7  <$paints     - Display's your paints list>
8  <$profile    - Check your profile>
9  <$crystals   - Display's your crystals>
10 <$paintwiki  - Information on paints>
\`\`\`\`⫸ Requested by ${user_display} ⫷\`
`)

}
module.exports.help = {
    name : "help"
}