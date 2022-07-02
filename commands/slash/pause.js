exports.pause = {
  name: 'pause',
  description: 'Pause command',
  type: 'CHAT_INPUT',
  func_status: true,
  func: [
    Number,
    {},
  ],
  init: async (client, interaction, player, utils) => {
    this[utils.name]
        .func[1][this[utils.name]
            .func[0]]['volume'](client, interaction, player);
  },
};
