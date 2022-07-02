/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
const {FolodyCore} = require('../../core');

exports.play = {
  name: 'play',
  description: 'Play command',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'song_name',
      description: 'Enter the name or url of the song',
      type: 'STRING',
      required: true,
    },
  ],
  func_status: true,
  func: [
    Number,
    {},
  ],
  init: async (client, interaction, player, utils) => {
    await interaction.deferReply();

    const voiceChannel = interaction.member.voice.channel; // voiceChannel
    // eslint-disable-next-line max-len
    if (!voiceChannel) return interaction.followUp(`You Need to Join Voice Channel`); // voiceChannel
    // set don't have permission to join voice channel
    // eslint-disable-next-line max-len
    // set voice channel is a staging channel, send "This is covered in several Folody policies. We want a good experience. Bot can give you bad experience if it is in stage channel. So let the bot play in the regular voice chat channel"
    // eslint-disable-next-line max-len
    if (interaction.member.voice.channel.type === 'GUILD_STAGE_VOICE') return interaction.followUp(`This is covered in several **Folody** policies. We want a good experience. Bot can give you bad experience if it is in stage channel. So let the bot play in the regular voice chat channel`); // voiceChannel
    // eslint-disable-next-line max-len
    if (!interaction.member.voice.channel.joinable) return interaction.followUp(`I Don't Have Permission To Join Voice Channel`); // voiceChannel
    // set don't permission to speak in voice channel
    // eslint-disable-next-line max-len
    if (!interaction.member.voice.channel.speakable) return interaction.followUp(`I Don't Have Permission To Speak In Voice Channel`);
    // set don't permission to speak in voice channel
    // eslint-disable-next-line max-len
    if (!interaction.member.voice.channel.permissionsFor(interaction.guild.me).has('CONNECT')) return interaction.followUp(`I Don't Have Permission To Connect To Voice Channel`); // voiceChannel
    // eslint-disable-next-line max-len
    if (!interaction.member.voice.channel.permissionsFor(interaction.guild.me).has('SPEAK')) return interaction.followUp(`I Don't Have Permission To Speak In Voice Channel`); // voiceChannel
    // set Missing Permissions
    // eslint-disable-next-line max-len
    if (!interaction.member.voice.channel.permissionsFor(interaction.guild.me).has('VIEW_CHANNEL')) return interaction.author.send(`I Don't Have Permission To View Voice Channel`); // voiceChannel
    // set Missing Permissions
    // eslint-disable-next-line max-len
    if (!interaction.member.voice.channel.permissionsFor(interaction.guild.me).has('SEND_MESSAGES')) return interaction.author.send(`I Don't Have Permission To Send Messages In Voice Channel`); // voiceChannel
    // set Missing Permissions
    // eslint-disable-next-line max-len
    if (!interaction.member.voice.channel.permissionsFor(interaction.guild.me).has('EMBED_LINKS')) return interaction.author.send(`I Don't Have Permission To Embed Links In Voice Channel`); // voiceChannel
    // set Missing Permissions
    // eslint-disable-next-line max-len
    if (!interaction.member.voice.channel.permissionsFor(interaction.guild.me).has('ATTACH_FILES')) return interaction.author.send(`I Don't Have Permission To Attach Files In Voice Channel`); // voiceChannel
    // set Missing Permissions
    // eslint-disable-next-line max-len
    if (!interaction.member.voice.channel.permissionsFor(interaction.guild.me).has('READ_MESSAGE_HISTORY')) return interaction.author.send(`I Don't Have Permission To Read Message History In Voice Channel`);
    /**
     * @type {Player}
     * @type {Message}
     * @type {String[]}
     */


    if (
      interaction.guild.me.voice.channel &&
      // eslint-disable-next-line max-len
      interaction.member.voice.channel.id != interaction.guild.me.voice.channel.id // If the bot is in a voice channel and the user isn't in the same voice channel
    ) {
      // eslint-disable-next-line max-len
      interaction.followUp(`**I'm playing music in** <#${interaction.guild.me.voice.channel.id}>`); // Tell the user the bot is in a voice channel
      return;
    }

    const query = interaction.options.get('song_name').value;

    // eslint-disable-next-line camelcase
    let search_Song = query;
    // eslint-disable-next-line camelcase
    search_Song = query.replace(/[`'"]/gi, '');
    // remove words before :// and replace it with https://
    // eslint-disable-next-line camelcase, no-unused-vars
    search_Song = query.replace(/^.*?:\/\//g, 'https://');

    // eslint-disable-next-line max-len
    this[utils.name]
        .func[1][this[utils.name]
            .func[0]]['play'](FolodyCore, interaction, player, search_Song);
  },
};
