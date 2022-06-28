exports.skip = {
  name: 'skip',
  description: 'Skip command',
  type: 'CHAT_INPUT',
  func_status: true,
  func: {},
  init: async (client, interaction, player, utils) => {
    await interaction.deferReply();
    this[utils.name].func['skip'](client, interaction, player);
  },
};
