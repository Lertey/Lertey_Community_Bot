const {ComponentType, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Get a list of all the commands from the discord bot"),
    async execute(interaction) {
        const commandList = interaction.client.commands.map(command => `${command.data.name} - ${command.data.description}`).join('\n');

        const helpEmbed = new EmbedBuilder()
            .setColor('#99DBF5')
            .setTitle('Help information')
            .setDescription(`List of available commands: \n${commandList}`)
            .setImage('https://gifdb.com/images/high/sesame-street-ernie-help-2cdp6geehj32aaxy.gif')
            .setTimestamp()
            
        await interaction.reply({ embeds: [helpEmbed] });
    }
}