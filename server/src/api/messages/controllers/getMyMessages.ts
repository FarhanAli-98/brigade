import { Request, Response, RequestHandler, NextFunction } from 'express';

import { IMessage, Messages } from '../../../models';

const getMyMessages: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  let messages: IMessage[] = [];
  let cachedMessages: IMessage[] = [];

  // cachedMessages = await JSON.parse(await (redis.get('cachedMessages') as any)); 
  // if(cachedMessages) { 
  //   messages = cachedMessages.filter((message: any) => message.senderID == req.user.id || message.receiverID == req.user.id) 
  // }
  const dbMessages = await Messages.find({
    $or: [
      { 'senderID': req.user.id },
      { 'receiverID': req.user.id }
    ]
  }).populate('receiverID');
  // if(cachedMessages && dbMessages) {
  //   messages = cachedMessages.concat(dbMessages);
  // }
  // else if ( dbMessages ) {
  //   messages = dbMessages
  // }
  console.log(dbMessages);
  if(true) {
    res.status(200).json({ 
      success: true,
      message: "Getting your messages",
      data: dbMessages
    })
  }
  else { 
    res.status(204);
  }
};

export default getMyMessages;