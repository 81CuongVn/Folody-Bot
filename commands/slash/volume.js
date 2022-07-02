/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
const {FolodyCore} = require('../../core');

exports.volume = {
  name: 'volume',
  description: 'Volume command',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'value',
      description: 'Value of volume',
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
    const query = interaction.options.get('value').value;
    this[utils.name]
        .func[1][this[utils.name]
            .func[0]]['volume'](client, interaction, player, query);
  },
};
