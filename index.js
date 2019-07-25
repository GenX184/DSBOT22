//TankiCrates BOT
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 150000);

const BotPrefix = require("./prefix.json");
const Discord = require("discord.js");
const db = require("quick.db");

const fs = require("fs");
const ms = require("ms");

//let profile = JSON.parse(fs.readFileSync("GameBase/garage.json","utf8"));

const bot =  new Discord.Client();
bot.commands = new Discord.Collection();
bot.testing = new Discord.Collection();
bot.admin = new Discord.Collection();

//Commands Folder
let propsCountC = 0;
fs.readdir("./1commands/", (err,files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.lenglth <= 0)
    {
        console.log("Couldn't find commands");
        return;
    }
    jsfile.forEach((f,i) => {
            let props = require(`./1commands/${f}`);
            propsCountC = propsCountC + 1
            bot.commands.set(props.help.name, props);
    })
    console.log(propsCountC+' files loaded in [ 1commands ] folder')
});

//Bot Start
bot.on("ready" , async () => {
    console.log(`${bot.user.username} is online !`);
    if(!bot.on) return console.log("nodemon index.js")
    bot.user.setActivity("with crates", {type :"PLAYING"});
});

//Bot Message input initiation
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    //db.add(`globalMessages_${message.author.id}`,1)
    //db.add(`guildMessages_${message.guild.id}_${message.author.id}`,1)

    let prefix = BotPrefix.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
    function clean(text) {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }

    if (message.content.startsWith(prefix + "gotham")) {
        //message.delete();
        if(message.author.id !== '292675388180791297') return;
        try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }

//Prefix Checker for Folder commands
    if(message.content.startsWith(prefix))
    {
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if(commandfile) {
        console.log('- - - - - - - - - - - - - - -')    
        commandfile.run(bot,message,args);
        }
        if(commandfile)
        {
                let commandfile = bot.commands.get('levelupcheck');
                commandfile.run(bot,message,args);
        }
    }
    // if(message.content.startsWith(prefix))
    // {
    //     let commandfile = bot.commands.get(cmd.slice(prefix.length));
    //     if(commandfile) commandfile.run(bot,message,args);
    // }

    if(cmd === 'owner')
    {
        message.channel.send('Becuz Am Batman Not really just MiMs  :bat:');
    }
  
    if(cmd === `${prefix}batman`)
    {
        message.channel.send('The Hero that the Server needs , Not that it deserves :bat:');
    }

});
//Key To Run BOT
bot.login(process.env.TOKEN);
