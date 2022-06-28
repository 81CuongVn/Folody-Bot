const discordjs = 'discord.js';
const Discordplayer = 'discord-player';
exports.FolodyCore = {
  // Discord.js
  Client: require(discordjs).Client,
  Intents: require(discordjs).Intents,
  Collection: require(discordjs).Collection,
  // Discord-Player
  Player: require(Discordplayer).Player,
  QueryType: require(Discordplayer).QueryType,
  QueueRepeatMode: require(Discordplayer).QueueRepeatMode,
};
