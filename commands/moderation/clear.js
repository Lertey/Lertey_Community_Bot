const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear chat command')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option => option.setName('amount')
            .setDescription('Amout of msg to clear')
            .setRequired(true))
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Select a target to clear their msg')
                .setRequired(false)
        ),
    async execute(interaction) {
        const { channel, options } = interaction

        const amount = options.getInteger('amount')
        const target = options.getUser("target")

        const messeges = await channel.messages.fetch({
            limit: amount + 1,
        })

        const res = new EmbedBuilder()
            .setColor('#E1AEFF')

        if (target) {
            let i = 0
            const filtered = [];
                (await messeges).filter((msg) => {
                    if (msg.author.id === target.id && amount > 1) {
                        filtered.push(msg)
                        i++
                    }
                })

            await channel.bulkDelete(filtered).then(messeges => {
                res.setDescription(`Succesfully delted ${messeges.size} messages from ${target}`)
                interaction.reply({ embeds: [res] })
            })
        } else {
            await channel.bulkDelete(amount, true).then(messeges => {
                res.setDescription(`Succesfully delted ${messeges.size} messages from channel`)
                interaction.reply({ embeds: [res] })

            })
        }
    }
}