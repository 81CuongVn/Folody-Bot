exports.leave = {
  name: 'leave',
  description: 'Leave command',
  type: 'CHAT_INPUT',
  func_status: false,
  func: [
    Number,
    {},
  ],
  init: async (client, interaction, player, utils) => {
    const voiceChannel = interaction.member.voice.channel;
    // eslint-disable-next-line max-len
    if (!voiceChannel) return interaction.reply(`You Need to Join Voice Channel`);
    // eslint-disable-next-line max-len
    if (!interaction.guild.me.voice.channel) return interaction.reply('I\'m not in any voice room');
    if (
      interaction.guild.me.voice.channel &&
      // eslint-disable-next-line max-len
      interaction.member.voice.channel.id != interaction.guild.me.voice.channel.id
    ) {
      // eslint-disable-next-line max-len
      interaction.reply(`**I'm playing music in** <#${interaction.guild.me.voice.channel.id}>`);
      return;
    }
    interaction.guild.me.voice.disconnect();
    interaction.reply(`Left <#${interaction.guild.me.voice.channel.id}>`);
  },
};
