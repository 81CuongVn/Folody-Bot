// eslint-disable-next-line no-unused-vars
const {Message, Client, MessageEmbed} = require('discord.js');
const Str = require('@supercharge/strings');

exports.queue = {
  name: 'queue',
  description: 'Queue command',
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
    const queue = player.getQueue(interaction.guild.id);
    // eslint-disable-next-line max-len
    if (!queue || !queue.playing) return interaction.reply('**Nothing playing!**');
    if (
      interaction.guild.me.voice.channel &&
      // eslint-disable-next-line max-len
      interaction.member.voice.channel.id != interaction.guild.me.voice.channel.id
    ) {
      // eslint-disable-next-line max-len
      interaction.reply(`**I'm playing music in** <#${interaction.guild.me.voice.channel.id}>`);
      return;
    }
    const currentTrack = queue.current;
    const tracks = queue.tracks.slice(0, 10).map((m, i) => {
      // make length of track name - requester name
      const lengthComplete = Number(50 - m.requestedBy.tag.length);
      // eslint-disable-next-line max-len, new-cap
      const title = Str(m.title).limit(m.requestedBy.tag.length > 30 ? 49 : lengthComplete, '...').get();
      return `${i + 1}. [${title}](${m.url}) - ${
            m.requestedBy.tag.length > 30 ? `` : m.requestedBy.tag
      }`;
    });
    // eslint-disable-next-line new-cap
    const currentTitle = Str(currentTrack.title).limit(50, '...').get();
    const embed = new MessageEmbed()
        .setTitle(`Now playing **${currentTitle}**`)
        .setColor('#34eb56')
        .setDescription(`${tracks.join('\n')}${
            queue.tracks.length > tracks.length ?
                `\n...${
                      queue.tracks.length - tracks.length === 1 ?
                          `${
                            queue.tracks.length - tracks.length
                          } more track` :
                          `${
                            queue.tracks.length - tracks.length
                          } more tracks`
                }` :
                ''
        }`);
    interaction.reply({embeds: [embed]});
  },
};
