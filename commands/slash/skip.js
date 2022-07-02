exports.skip = {
  name: 'skip',
  description: 'Skip command',
  type: 'CHAT_INPUT',
  func_status: true,
  func: [
    Number,
    {},
  ],
  init: async (client, interaction, player, utils) => {
    await interaction.deferReply();
    this[utils.name]
        .func[1][this[utils.name]
            .func[0]]['skip'](FolodyCore, interaction, player);
  },
};
