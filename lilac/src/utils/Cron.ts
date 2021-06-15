import { CronJob } from 'cron';
import { redis } from '../redis';
import { IMessage, Messages } from '../models';
import Message from '../services/Message';

class Cron {

  constructor(private messageService: Message) {}

   backupMessagesFromCacheToDB(): CronJob {
    return new CronJob('* * * * *', async () => {
      try {
        const messages: IMessage[] = await JSON.parse(await (redis.get('cachedMessages') as any));
        if(!messages) { return; }
        await this.messageService.storeMessagesToDB(messages);
        await this.messageService.invalidateMessagesCache();
      } catch (error) {
        console.log(error)
      };
    })
  };

};

export default Cron;