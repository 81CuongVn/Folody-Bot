exports.stop = {
  name: 'stop',
  description: 'Stop command',
  type: 'CHAT_INPUT',
  func_status: true,
  func: {},
  init: async (client, interaction, player, utils) => {
    await interaction.deferReply();
    this[utils.name].func['stop'](client, interaction, player);
  },
};
