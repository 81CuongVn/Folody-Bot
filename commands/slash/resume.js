exports.resume = {
  name: 'resume',
  description: 'Resume command',
  type: 'CHAT_INPUT',
  func_status: false,
  func: {},
  init: async (client, interaction, player, utils) => {
    const voiceChannel = interaction.member.voice.channel;
    // eslint-disable-next-line max-len
    if (!voiceChannel) return interaction.reply(`You Need to Join Voice Channel`);
    if (
      interaction.guild.me.voice.channel &&
      // eslint-disable-next-line max-len
      interaction.member.voice.channel.id != interaction.guild.me.voice.channel.id
    ) {
      // eslint-disable-next-line max-len
      interaction.reply(`**I'm playing music in** <#${interaction.guild.me.voice.channel.id}>`);
      return;
    }
    const queue = player.getQueue(interaction.guild.id);
    if (!queue) return interaction.reply('**Nothing to pause!**');
    queue.setPaused(false);
    interaction.reply(`Song Resumed`);
  },
};
