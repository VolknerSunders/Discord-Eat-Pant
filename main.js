const { randomBytes } = require('crypto');
const Discord = require('discord.js');
const prefixHandler = require('./prefix')

let prefixFile = await prefixHandler.readPrefix()

let prefix = (prefixFile  && prefixFile !== '') ? prefixFile : '|'

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ya inicio el bot');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    

    if(command === 'ping'){
        const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! Este mensaje tuvo una latencia de ${timeTaken}ms.`);
    }else if(command === 'c'){
        message.channel.send('dura');
    }else if (command === "rol") {
        const numArgs = args.map(x => parseInt(x));
        if(numArgs > 8){
            message.reply('chingate')
        }else{
            var temp = Math.floor(Math.random() * numArgs) + 1;
            var cap = 0;
            switch(temp){
                case 1 : cap = Math.floor(Math.random() * 13) + 1;
                break;
                case 2 : cap = Math.floor(Math.random() * 22) + 1;
                break;
                case 3 : cap = Math.floor(Math.random() * 24) + 1;
                break;
                case 4 : cap = Math.floor(Math.random() * 22) + 1;
                break;
                case 5 : cap = Math.floor(Math.random() * 22) + 1;
                break;
                case 6 : cap = Math.floor(Math.random() * 25) + 1;
                break;
                case 7 : cap = Math.floor(Math.random() * 25) + 1;
                break;
                case 8 : cap = Math.floor(Math.random() * 25) + 1;
                break;
            }
            message.reply(`Van a ver el capitulo ${cap} de la temporada ${temp}!`);
        }
        
      }else if(command === 'noantojar'){
        const https = require('https');
        const xml2js = require('xml2js');
        const parser = new xml2js.Parser({ attrkey: "ATTR" });
        const tags = args.map(t=>t)
        var maximo;
        var randomId;
        let limite = https.get(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${tags}`, function(res){
            let data = '';
            res.on('data', function(stream) {
                data += stream;
            });
            res.on('end', function(){
                parser.parseString(data, function(error, result) {
            if(error === null) {
                        maximo = result.posts.ATTR.count
                        console.log(`numero maximo ${maximo}`);
                        randomId = Math.floor(Math.random() * maximo);
                        console.log(`numero al azar ${randomId}`);

                        let req = https.get(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&pid=${randomId}&tags=${tags}&limit=1`, function(res) { 
                        let data = '';
                            res.on('data', function(stream) {
                                data += stream;
                            });
                            res.on('end', function(){
                                parser.parseString(data, function(error, result) {
                            if(error === null) {
                                        message.channel.send(result.posts.post[0].ATTR.file_url)
                                    }
                            else {
                                        console.log(error);
                                    }
                                });
                            });
                        });
                    }
            else {
                        console.log(error);
                    }
                });
            });
        });
        
        
    } else if (command === 'prefix') {
        if (args.length < 0 && args[0] ==! '') {
            prefix = args[0]
            prefixHandler.changePrefix(args[0])
        }
    }
})

client.on('message', message => {
    
    // If the message is "what is my avatar"
    if (message.content === 'avatar') {
      // Send the user's avatar URL
      message.reply(message.author.displayAvatarURL());
    }else if (message.content === 'pasa pack') {
        message.channel.send('https://imgur.com/6uv0rp3');
    }else if (message.content === 'ya antojaron') {
        message.channel.send('https://imgur.com/a/SqnZZnv');
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



client.login('agrega tu token,basura');
