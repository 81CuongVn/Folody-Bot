exports['volume'] = function(client, interaction, player, query) {
  const voiceChannel = interaction.member.voice.channel;
  // eslint-disable-next-line max-len
  if (!voiceChannel) return interaction.followUp(`You Need to Join Voice Channel`);
  if (
    interaction.guild.me.voice.channel &&
    // eslint-disable-next-line max-len
    interaction.member.voice.channel.id != interaction.guild.me.voice.channel.id
  ) {
    // eslint-disable-next-line max-len
    interaction.followUp(`**I'm playing music in** <#${interaction.guild.me.voice.channel.id}>`);
    return;
  }
  const queue = player.getQueue(interaction.guild.id);
  // eslint-disable-next-line max-len
  if (!queue || !queue.playing) return interaction.followUp('**Nothing playing!**');
  const amount = parseInt(query[0]);
  queue.setVolume(amount);
  interaction.followUp(`Volume Set to \`${amount}\``);
};
