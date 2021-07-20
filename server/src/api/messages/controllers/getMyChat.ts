import { Request, Response, RequestHandler, NextFunction } from "express";

import { IMessage, Messages } from "../../../models";

const getMyChat: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let messages: IMessage[] = [];
  let cachedMessages: IMessage[] = [];
  const userID: string = req.params.userID;

  // cachedMessages = await JSON.parse(await (redis.get("cachedMessages") as any));
  // if (cachedMessages) {
  //   messages = cachedMessages.filter((message: any) => {
  //     return (
  //       (message.senderID == req.user.id && message.receiverID == userID) ||
  //       (message.senderID == userID && message.receiverID == req.user.id)
  //     );
  //   });
  // }
  const dbMessages = await Messages.find({
    $or: [
      {
        $and: [{ senderID: req.user.id }, { receiverID: userID }],
      },
      {
        $and: [{ senderID: userID }, { receiverID: req.user.id }],
      },
    ],
  });
  // if (cachedMessages && dbMessages) {
  //   messages = cachedMessages.concat(dbMessages);
  // } else if (dbMessages) {
  //   messages = dbMessages;
  // }
  console.log(dbMessages);
  res.status(200).json({
    success: true,
    message: "Getting your messages with the user",
    data: dbMessages,
  });
};

export default getMyChat;
