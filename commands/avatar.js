module.exports = {
    name : 'avatar',
    description : "Sube el avatar del usuario que lo puso",
    execute(message,args){
        message.reply(message.author.displayAvatarURL());
    }
}