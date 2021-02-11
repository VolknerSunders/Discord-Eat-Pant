module.exports = {
    name: 'leave',
    description: 'Para el bot y se sale del canal de voz',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('Ocupas estar en un canal de voz para ejecutar este comando!');
        await voiceChannel.leave();
    }
}