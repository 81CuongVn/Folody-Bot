const {MessageEmbed} = require('discord.js');

exports.ping = {
  name: 'ping',
  description: 'Ping command',
  type: 'CHAT_INPUT',
  func_status: false,
  func: [
    Number,
    {},
  ],
  init: async (client, interaction) => {
    interaction.reply({
      embeds: [
        new MessageEmbed()
            .setDescription(`Play music with **${client.ws.ping}ms**`),
      ],
      ephemeral: true,
    });
  },
};
