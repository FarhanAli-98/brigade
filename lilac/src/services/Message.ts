import { IMessage, Messages } from '../models';
import { redis } from '../redis';

class Message {

  private cachedMessages: IMessage[] = [];
  
  async init() {
    const messages = await JSON.parse(await (redis.get('cachedMessages') as any));
    if(messages) {
      this.cachedMessages = messages
    }
  }

  async storeMessagesToDB(messages: IMessage[]): Promise<any> {
    try {
      await Messages.insertMany(messages)
    } catch (error) {
      console.log(error)
    }
  };

  async invalidateMessagesCache() {
    this.cachedMessages = [];
    return await redis.set('cachedMessages', JSON.stringify([]));
  };

  async cacheMessage(message: IMessage) {
    this.cachedMessages.push(message)
    return await redis.set('cachedMessages', JSON.stringify(this.cachedMessages));
  };

  getCachedMessages(): IMessage[] {
    return this.cachedMessages;
  }

  async getMessagesFromDB(): Promise<any> {

  }

};

export default Message;