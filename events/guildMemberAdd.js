const {EmbedBuilder} = require('@discordjs/builders')
const {GuildMember} = require('discord.js')

module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        const {user, guild} = member
        const welkomeChannel = member.guild.channals.cache.get('1117102688019157053')
        const welkomeMassege = `Welkome ${member.id} to the guild`

        welkomeChannel.send({content: welkomeMassege})
    }
}