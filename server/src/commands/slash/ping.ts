import { ApplicationCommandType, CommandInteraction, EmbedBuilder } from 'discord.js';
import { Folody } from '@Folody/client/Client';


export default {
  name: 'ping',
  description: 'Ping commands',
  type: ApplicationCommandType.ChatInput,
  init: (folody: Folody, interaction: CommandInteraction): void  => {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`Play music with ${folody.client.ws.ping}ms`)
          .setColor('#34eb56')
      ]
    });
  },
}