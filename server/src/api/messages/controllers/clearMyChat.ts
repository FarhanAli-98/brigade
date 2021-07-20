import { Request, Response, RequestHandler, NextFunction } from "express";
import { IMessage, Messages } from "../../../models";

const clearMyChat: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let messages: IMessage[] = [];
  let cachedMessages: IMessage[] = [];
  const userID: any = req.query.userID;
  const dbMessages = await Messages.deleteMany({
    $or: [
      {
        $and: [{ senderID: req.user.id }, { receiverID: userID }],
      },
      {
        $and: [{ senderID: userID }, { receiverID: req.user.id }],
      },
    ],
  });
  console.log(dbMessages);
  res.status(200).json({
    success: true,
    message: "chat clear",
    data: dbMessages,
  });
};

export default clearMyChat;
