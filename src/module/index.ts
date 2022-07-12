import 'dotenv/config';
import fs from 'fs';
import { ActivityType, PresenceStatusData } from 'discord.js';
import { Folody } from '@Folody/client';

const status: PresenceStatusData[] = ['online','idle','dnd'];
const folody = new Folody();

let position = 0;

folody.client.login(process.env.DISCORD_TOKEN).then(() => {
  // eslint-disable-next-line no-console
  console.log('Logged in!');
  setInterval(() => {
    folody.client.user?.setPresence({
      status: status[position], 
      activities: [
        {
          name: `/play`,
          type: ActivityType.Listening,
          url: 'https://folody.xyz'
        },
      ]
    });
    position++;
    if (position >= status.length) {
      position = 0;
    }
    
  }, 1400);
  fs.readdir(`${__dirname}/../handler`, function(err, files) {
    /**
     * @param {Client} client
     */
    if (err) throw err;
    files.forEach(file => {
      if (!file.endsWith('.js')) return;
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require(`@Folody/handler/${file}`)[file.split('.')[0]](folody);
    });
  });
});
