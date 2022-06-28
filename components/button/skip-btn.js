// eslint-disable-next-line valid-jsdoc
/**
 *
 * @param {*} client
 * @param {*} interaction
 * @param {*} player
 * @returns
 */
exports['skip-btn'] = async (client, interaction, player) => {
  const guild = client.guilds.cache.get(interaction.guild.id);
  const member = guild.members.cache.get(interaction.member.user.id);
  const voiceChannel = member.voice.channel;
  // eslint-disable-next-line max-len
  if (!voiceChannel) return interaction.followUp({content: `You Need to Join Voice Channel`, ephemeral: true});
  if (
    interaction.guild.me.voice.channel &&
    member.voice.channel.id != interaction.guild.me.voice.channel.id
  ) {
    // eslint-disable-next-line max-len
    interaction.followUp({content: `**I'm playing music in** <#${interaction.guild.me.voice.channel.id}>`, ephemeral: true});
    return;
  }
  const queue = player.getQueue(interaction.guild.id);
  // eslint-disable-next-line max-len
  if (!queue || !queue.playing) return interaction.followUp({content: '**Nothing playing!**', ephemeral: true});
  queue.skip();
  // eslint-disable-next-line max-len
  interaction.message.edit({content: 'Song skipped', embeds: [], components: []});
};
