'use-strict';
require('dotenv').config();
const {FolodyCore} = require('./core');

const fs = require('fs');
/**
 * @typedef {Object} Config
 * @property {string} token
 */
const client = new FolodyCore.Client({
  intents: [
    FolodyCore.Intents.FLAGS.GUILDS,
    FolodyCore.Intents.FLAGS.GUILD_MEMBERS,
    FolodyCore.Intents.FLAGS.GUILD_MESSAGES,
    FolodyCore.Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

// eslint-disable-next-line no-unused-vars
const player = new FolodyCore.Player(client, {
  ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25,
  },
  leaveOnEnd: true,
  leaveOnStop: true,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 5000,
  autoSelfDeaf: true,
  initialVolume: 50,
  bufferingTimeout: 3000,
});

client.cores = new FolodyCore.Collection();

['events', 'handler'].forEach((dir) => {
  fs.readdir(`./${dir}/`, (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
      if (!file.endsWith('.html')) return;
      fs.readFile(`./${dir}/${file}`, 'utf-8', (err, data) => {
        if (err) return console.error(err);
        data = data.replace(/<script>/g, '');
        data = data.replace(/<.*\/script>/g, '');
        eval('(function() {' + data + '})()');
      });
    });
  });
});

client.login(process.env.TOKEN);
