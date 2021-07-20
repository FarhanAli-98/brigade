import { Request, Response, RequestHandler, NextFunction } from "express";

import { group, IMessage, Messages } from "../../../models";

const GetMyGroups: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  //const userID: string = req.params.userID;

  const dbMessages = await group.find({
    $or: [
      { 'ownerID': req.user.id },
      { 'members': {$in : req.user.id}}
    ],
  });
  
  console.log(dbMessages);
  res.status(200).json({
    success: true,
    message: "Getting your messages with the user",
    data: dbMessages,
  });
};

export default GetMyGroups;
