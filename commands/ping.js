module.exports = {
    name : 'ping',
    description : "Te devuelve la latencia",
    execute(message,args){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! Este mensaje tuvo una latencia de ${timeTaken}ms.`);
    }
}