const { count } = require('console');

module.exports = {
    name : 'noantojar',
    description : "Antoja con una imagen al azar de rule34.xxx",
    execute(message,args){
        r34(message,args);
    }
}

function r34(message,args) {
    const https = require('https');
        const xml2js = require('xml2js');
        const parser = new xml2js.Parser({ attrkey: "ATTR" });
        var randomId = Math.floor(Math.random() * 1000000) + 1;
        console.log(randomId)
        let req = https.get(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1&id=${randomId}`, function(res) { 
        let data = '';
        res.on('data', function(stream) {
            data += stream;
        });
        res.on('end', function(){
            parser.parseString(data, function(error, result) {
                if(error === null) {
                    cuenta = result.posts.ATTR.count;
                    if(cuenta > 0){
                        message.channel.send(result.posts.post[0].ATTR.file_url)
                    }else{
                        console.log("entro")
                        r34(message,args)
                    }
                }else {
                    console.log(error);
                }
                });
            });
        });
}