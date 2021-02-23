const Discord = require('discord.js');

module.exports = {
    name : 'avatar',
    description : "Sube el avatar del usuario que lo puso",
    async execute (client, message, args) {

        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({size: 1024})


        const embed = new Discord.MessageEmbed()
        .setTitle(`Avatar de ${member.username}`)
        .setImage(avatar)
        .setColor("RANDOM")

        message.channel.send(embed);
    }
}