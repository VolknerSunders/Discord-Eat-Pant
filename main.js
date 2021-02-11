const { randomBytes } = require('crypto');
const Discord = require('discord.js');
const prefixHandler = require('./prefix')
const episodes = require('./episodes');
const { tokenBot } = require('./tokens');
//const DISCORD_TOKEN = process.env.DISCORD_TOKEN || ''

const botToken = require('./tokens');
const DISCORD_TOKEN = botToken.tokenBot;
console.log(DISCORD_TOKEN)
let prefix = '|'

prefixHandler.readPrefix().then(res => {
    prefix = res.name ? res.name : prefix
});

const client = new Discord.Client();

const fs = require('fs');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ya inicio el bot');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    

    if(command === 'ping'){
        client.commands.get('ping').execute(message,args);
    }else if(command === 'c'){
        client.commands.get('c').execute(message,args);
    } else if(command === 'roll') {
        const numArgs = args.map(x => parseInt(x));
        episodes.getEpisodeByRoll(numArgs)
        .then(res => message.reply(`van a ver el episodio **${res.season}x${res.number_in_season}** llamado *"${res.title}"*.\n${res.image_url}`))
        .catch(err => message.reply(err.error))
    } else if(command === 'r34'){
        client.commands.get('r34').execute(message,args);
    }else if(command === 'noantojar'){
        client.commands.get('noantojar').execute(message,args);
    }else if (command === 'prefix') {
        if (args.length > 0 && args[0]) {
            prefix = args[0]
            prefixHandler.changePrefix(args[0])
            console.log('Updating prefix')
            message.reply(`El nuevo prefijo es ${prefix}`)
        }
    }else if (command === 'avatar') {
        client.commands.get('avatar').execute(message,args);
    }else if (command === 'play') {
        client.commands.get('play').execute(message,args);
    }else if (command === 'leave') {
        client.commands.get('leave').execute(message,args);
    }
})

client.on('message', message => {
    
    // If the message is "what is my avatar"
    if (message.content === 'pasa pack') {
        message.channel.send('https://imgur.com/6uv0rp3');
    }else if (message.content === 'ya antojaron') {
        message.channel.send('https://imgur.com/a/SqnZZnv');
    }else if (message.content === 'Uni cheems') {
        message.channel.send('https://imgur.com/ny2IhXj');
    }else if(message.content === 'cuando yo la vi'){
        message.channel.send(':yellow_square: :yellow_square: :yellow_square: :yellow_square: :black_large_square:'
                                +'\n:yellow_square: :yellow_square: :yellow_square: :yellow_square: :black_large_square: '
                                +'\n:yellow_square: :yellow_square: :yellow_square: :yellow_square: :yellow_square: :black_large_square:'
                                +'\n:yellow_square: :yellow_square: :yellow_square: :yellow_square: :yellow_square: :black_large_square:'
                                +'\n:yellow_square: :yellow_square: :yellow_square: :yellow_square: :yellow_square: :yellow_square: :black_large_square: :black_large_square: '
                                +'\n:yellow_square: :yellow_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :white_large_square: :white_large_square: :black_large_square: '
                                +'\n:yellow_square: :yellow_square: :black_large_square: :white_large_square: :white_large_square: :black_large_square: :white_large_square: :white_large_square: :white_large_square: :black_large_square: '
                                +'\n:yellow_square: :black_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :black_large_square: :white_large_square: :black_large_square: :white_large_square: :black_large_square: '
                                +'\n:yellow_square: :black_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :black_large_square: :white_large_square: :white_large_square: :black_large_square: '
                                +'\n:yellow_square: :black_large_square: :white_large_square: :white_large_square: :black_large_square: :white_large_square: :white_large_square: :black_large_square: :black_large_square:'
                                +'\n:yellow_square: :yellow_square: :black_large_square: :white_large_square: :white_large_square: :white_large_square: :white_large_square: :black_large_square: :yellow_square: :black_large_square:'
                                );
        message.channel.send(':yellow_square: :yellow_square: :yellow_square: :black_large_square: :black_large_square: :black_large_square: :yellow_square: :yellow_square: :yellow_square: :black_large_square:'
                                +'\n:yellow_square: :yellow_square: :yellow_square: :yellow_square: :yellow_square: :yellow_square: :yellow_square: :black_large_square: :black_large_square: :black_large_square:'
                                +'\n:yellow_square: :yellow_square: :yellow_square: :yellow_square: :yellow_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square:'
                                +'\n:yellow_square: :yellow_square: :yellow_square: :yellow_square: :yellow_square: :black_large_square: :black_large_square: :brown_square: :brown_square: :black_large_square:'
                                +'\n:yellow_square: :yellow_square: :yellow_square: :black_large_square: :brown_square: :brown_square: :brown_square: :brown_square: :brown_square: :black_large_square:'
                                +'\n:yellow_square: :yellow_square: :black_large_square: :brown_square: :brown_square: :brown_square: :brown_square: :brown_square: :brown_square: :brown_square: :black_large_square:'
                                +'\n:yellow_square: :yellow_square: :black_large_square: :brown_square: :black_large_square: :brown_square: :brown_square: :brown_square: :brown_square: :black_large_square:'
                                +'\n:yellow_square: :yellow_square: :black_large_square: :brown_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square:'
                                +'\n:yellow_square: :yellow_square: :black_large_square: :brown_square: :brown_square: :brown_square: :black_large_square: '
                                +'\n:yellow_square: :yellow_square: :yellow_square: :black_large_square: :brown_square: :brown_square:'
                                +'\nwujuju'
                                );
    }
  });




//client.login(DISCORD_TOKEN);
client.login(DISCORD_TOKEN)
