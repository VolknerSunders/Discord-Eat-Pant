const { stringify } = require('querystring');

module.exports = {
    name : 'r34',
    description : "Este te busca una imagen al azar del nombre que pusiste despues del comando en la pagina rule34.xxx",
    execute(message,args){
        if(!args.length) return message.channel.send('Ocupas mandar nombre de un personaje')
        const https = require('https');
        const xml2js = require('xml2js');
        const parser = new xml2js.Parser({ attrkey: "ATTR" });
        var tags = args.map(t=>t)
        var link = `https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${tags}`
        link = link.replace(/,/gi,'+');
        var maximo;
        var randomId;
        let limite = https.get(link, function(res){
            let data = '';
            res.on('data', function(stream) {
                data += stream;
            });
            res.on('end', function(){
                parser.parseString(data, function(error, result) {
            if(error === null) {
                        maximo = result.posts.ATTR.count;
                        console.log(`numero maximo ${maximo}`);
                        randomId = Math.floor(Math.random() * maximo);
                        console.log(`numero al azar ${randomId}`);
                        var link2 = `https://rule34.xxx/index.php?page=dapi&s=post&q=index&pid=${randomId}&tags=${tags}&limit=1`
                        link2 = link2.replace(/,/gi,'+');
                        if(maximo === 0){
                            message.reply("no sabes escribir")
                        }else if(maximo > 0){
                            let req = https.get(link2, function(res) { 
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
                        
                    }
            else {
                        console.log(error);
                    }
                });
            });
        });
    }
}