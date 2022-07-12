import { Interaction, Message } from 'discord.js';
import { Folody } from '@Folody/client/Client';
exports['interactions'] = function (folody: Folody) {
  folody.client.on('interactionCreate',  (_interaction: Interaction) => {
    if (_interaction.isChatInputCommand()) {
      const command = folody.commands.get(_interaction.commandName);
      if (!command) return;
      if (command.name) {
        command.init(folody, _interaction);
      } else return void _interaction.reply('Command not found');
      
    }
  });
}