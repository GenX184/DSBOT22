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
 \`📋 BOT COMMANDS 📋\` 
\`\`\`md\n
#Bot 
1.  <$ping      - BOT connection to the server>
2.  <$botstats  - BOT stats>
3.  <$gamestats - BOT GAME stats>
#Game 
1.  <$level     - Display's your level>
2.  <$start     - Create your profile here>
3.  <$open      - Open to win awesome paints!>
4.  <$profile   - Check your profile>
5   <$crystals  - Display's your crystals>
6.  <$paints    - Display's your paints list>
7.  <$paintwiki - Information on paints>
8.  <$top       - Leaderboards>
9.  <$buy       - Purchase containers>
10. <$sell      - Sell paints to gain crystals>
\`\`\`\`⫸ Requested by ${user_display} ⫷\`
`)

}
module.exports.help = {
    name : "help"
}