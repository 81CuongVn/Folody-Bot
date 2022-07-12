import { GuildMember, TextChannel, EmbedBuilder } from 'discord.js';
import { servers } from '@Folody/function';
import { Folody } from '@Folody/client/Client';
exports['state'] = function (folody: Folody) {
  folody.client.on('voiceStateUpdate', (oldState, newState) => {
    // if member joined a voice channel
    if (newState.channelId && !oldState.channelId) {
      // get self voice channel
      
      const server = servers.get(newState.guild.id as string);
      if (newState.channelId === server?.voiceID) {
        // if member is bot
        // bot is moved to voice channel
        if (newState.member instanceof GuildMember && newState.member.user.bot) {
          const voice = newState.member?.voice?.channel;
          if (voice && voice.members.size > 1) {
            if (voice.members.some(member => member.user.bot)) {
              // mute all bot members
              // if have mute permission
              const self_user = folody.client.user as unknown as GuildMember;
              if (voice.permissionsFor(self_user).has('MuteMembers')) {
                voice.members.forEach(member => {
                  if (member.id !== self_user.id) {
                    if (member.user.bot) {
                      // mute bot member, except self
                      
                        member.voice.setMute(true);
                        // send message to member
                        (folody.client.channels.cache.get(server?.channelId as string) as TextChannel)?.send({
                          embeds: [
                            new EmbedBuilder()
                              .setColor('#34eb56')
                              .setTitle('Term of Service')
                              .setDescription(`You cannot play music while another bot is in the voice channel.`)
                          ]
                        });
                    }
                  }
                })
              } else {
                (folody.client.channels.cache.get(server?.channelId as string) as TextChannel)?.send({
                  embeds: [
                    new EmbedBuilder()
                      .setColor('#34eb56')
                      .setTitle('Term of Service')
                      .setDescription(`You cannot play music while another bot is in the voice channel.`)
                  ]
                });
                server?.leave()
              }
            }
          }
        }
      }
    }
    if(oldState.channelId != null && newState.channelId != null && newState.channelId != oldState.channelId) {
      const server = servers.get(newState.guild.id as string);
      const self_user = folody.client.user as unknown as GuildMember;
      if (newState.member instanceof GuildMember && newState.member.user.bot) {
        const voice = newState.member?.voice?.channel;
        if (voice) {
          if (voice.members.some(member => member.user.bot)) {
            
            voice.members.has(self_user.id) && server?.setVoice(newState.channelId);
            // eslint-disable-next-line no-console
            console.log(server?.voiceID);
          }
        }
            
      }

      if (newState.channelId === server?.voiceID) {
        // if member is bot
        // bot is moved to voice channel
        if (newState.member instanceof GuildMember && newState.member.user.bot) {
          const voice = newState.member?.voice?.channel;
          if (voice && voice.members.size > 1) {
            if (voice.members.some(member => member.user.bot)) {
              // mute all bot members
              // if have mute permission
              
              if (voice.permissionsFor(self_user).has('MuteMembers')) {
                voice.members.forEach(member => {
                  if (member.id !== self_user.id) {
                    if (member.user.bot) {
                      // mute bot member, except self
                      
                        member.voice.setMute(true);
                        // send message to member
                        (folody.client.channels.cache.get(server?.channelId as string) as TextChannel)?.send({
                          embeds: [
                            new EmbedBuilder()
                              .setColor('#34eb56')
                              .setTitle('Term of Service')
                              .setDescription(`You cannot play music while another bot is in the voice channel.`)
                          ]
                        });
                    }
                  }
                })
              } else {
                (folody.client.channels.cache.get(server?.channelId as string) as TextChannel)?.send({
                  embeds: [
                    new EmbedBuilder()
                      .setColor('#34eb56')
                      .setTitle('Term of Service')
                      .setDescription(`You cannot play music while another bot is in the voice channel.`)
                  ]
                });
                server?.leave()
              }
            }
          }
        }
      }
    }
    // if self has left voice channel
  
  
  })
}