// eslint-disable-next-line no-unused-vars
const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
// eslint-disable-next-line max-len, camelcase
exports['play'] = async (FolodyCore, interaction, player, search_Song) => {
  const queue = player.createQueue(interaction.guild.id, {
    metadata: interaction, // channel
  }); // Create a new queue for the guild
    // verify vc connection
    /**
     * @type {Player}
     * @type {Message}
     */
  try {
    // eslint-disable-next-line max-len
    if (!queue.connection) await queue.connect(interaction.member.voice.channel); // connect to vc
  } catch (err) {
    // if voice channel is disconnected
    // eslint-disable-next-line max-len
    if (err.message === 'Cannot destroy VoiceConnection - it has already been destroyed') return interaction.followUp(`**I'm not in a voice channel**`);
    queue.clear();
    queue.destroy();
    console.log(err);
    return await interaction.followUp({
      content: 'Could not join your voice channel!',
      ephemeral: true, // delete after 5 seconds
    }); // send error message
  }
  const song = await player
      .search(search_Song, {
        requestedBy: interaction.user, // requestedBy
        searchEngine: FolodyCore.QueryType.AUTO, // Search Engine
      }) // search for song
      .catch(() => {});
    // Status code: 410 of song not found
    // eslint-disable-next-line max-len, camelcase
  if (!song) return void interaction.followUp(` I cant Find \`${search_Song}\` `); // if song not found
  // eslint-disable-next-line max-len
  const songList = song.playlist ? song.tracks : song.tracks[0]; // if playlist
    // eslint-disable-next-line max-len
    song.playlist ? queue.addTracks(songList) : queue.addTrack(songList); // add song to queue
    if (!song.playlist) {
    // if Cannot read properties of undefined (reading 'duration')
    // eslint-disable-next-line max-len
      if (typeof songList.durationMS === 'undefined') return interaction.followUp(`**Song not found!**`); // if song not found
      // eslint-disable-next-line max-len
      if (songList.durationMS === 'undefined' || songList.durationMS === undefined) {
        queue.remove(songList);
        if (!queue.playing) queue.destroy();
        // eslint-disable-next-line max-len
        return void interaction.followUp('I can\'t play this song'); // return void to prevent message.reply from being called twice
      } // if song.durationMS === "undefined" || song.durationMS === undefined
      if (songList.durationMS > 5400000) {
        const embed1 = new MessageEmbed()
            .setColor('#34eb56')
            // eslint-disable-next-line max-len
            .setDescription('In order to meet the needs of smooth music listening and not being overloaded with data, the bot can only play songs under **1 hours 30 minutes** to provide a good experience. Thank you!');
        queue.remove(songList); // remove song from queue
        if (!queue.playing) queue.destroy(); // destroy queue
        // eslint-disable-next-line max-len
        return void interaction.followUp({embeds: [embed1]}); // message.reply(`**Song is too long!**`)
      }
      if (song.durationMS === 0) {
        if (queue.playing) {
          queue.remove(song);
          // eslint-disable-next-line max-len
          return void interaction.followUp('You must stop the current song before playing a stream');
        }
        // eslint-disable-next-line max-len
        await void interaction.followUp('Video stream must load in seconds. Please wait!').then(function thenMess(msg) {
          setTimeout(function() {
            msg.delete(); // delete message
            clearTimeout(thenMess); // clear timeout
          }, 3000); // set timeout
        }).catch((err) => {
        // eslint-disable-next-line max-len
          return void interaction.followUp('I can\'t play this song'); // return void to prevent message.reply from being called twice
        }); // send message
      } else {
        // eslint-disable-next-line max-len, camelcase
        await void interaction.followUp({content: `searched **\`${search_Song}\`!**`}).then((inter) => {
          inter.delete(2000); // delete message
        }); // send message
      }
    } else {
      for (let i = 0; i < song.tracks.length; i++) {
        // eslint-disable-next-line max-len
        if (typeof song.tracks[i].durationMS === 'undefined') return interaction.reply(`**Song not found!**`); // if song not found
        // eslint-disable-next-line max-len
        if (song.tracks[i].durationMS === 'undefined' || song.tracks[i].durationMS === undefined) {
          queue.remove(song.tracks[i]);
          if (!queue.playing) queue.clear(); queue.destroy();
          // eslint-disable-next-line max-len
          return void interaction.followUp('I can\'t play this song'); // return void to prevent message.reply from being called twice
        } // if song.durationMS === "undefined" || song.durationMS === undefined
        if (song.tracks[i].durationMS > 3000000) {
          const embed1 = new MessageEmbed()
              .setColor('#34eb56')
          // eslint-disable-next-line max-len
              .setDescription(`**Remove** \`${song.tracks[i].title}\` \n**Reason** the bot can only play songs under **1 hours** to provide a good experience`);
          queue.remove(song.tracks[i]); // remove song from queue
          // eslint-disable-next-line max-len
          interaction.followUp({embeds: [embed1]}).then((d) => {
            setTimeout(() => {
              d.delete({timeout: 5000});
            }, 5000);
          }); // message.reply(`**Song is too long!**`)
        };
        if (song.tracks[i].durationMS === 0) {
          if (song.tracks[0].durationMS === 0) {
            queue.clear(); queue.destroy();
            // eslint-disable-next-line max-len
            return void interaction.followUp('You cannot add live stream videos to a playlist. Please delete it and try again!');
          }
          queue.remove(song.tracks[i]);
          // eslint-disable-next-line max-len
          interaction.followUp(`**Removed** ${song.tracks[i].title} | **Reason:** Video stream can't in a playlist`);
        }
      }
      // eslint-disable-next-line max-len, camelcase
      await void interaction.followUp({content: `searched playlist **\`${search_Song}\`!**`}).then((inter) => {
        inter.delete(2000); // delete message
      }); // send message; // send message
    }


    /**
     * @param {MessageEmbed} embed
     * @param {String} title
     * @param {String} url
     * @param {String} description
     */


    if (!queue.playing) {
      await void queue.play().catch((err) => {
        // eslint-disable-next-line max-len
        interaction.followUp('I can\'t play this song'); // message.reply(`I can't play this song`)
      });
    } // play musics
};
