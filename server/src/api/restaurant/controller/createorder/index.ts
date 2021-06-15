import { Request, Response, RequestHandler, NextFunction } from 'express';
import consola from 'consola';
import {IOrder ,Order} from '../../../../models'
const createOrder: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const data: IOrder = { ...req.body };
  console.log("WE are in request order ")
data.orderId = req.user.id;
  

  try {
    data.name = req.body.name;
    console.log(data);
    // if (
    //   await Order.findOne({
    //     $or: [{ name: data.name }, { ownerID: req.user.id }],
    //   })
    // ) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "shop already exists or User have another shop",
    //   });
    // }
    // let order = undefined;
    // if (req.file) {
    //   company = await Shop.create({
    //     ...data,
    //     logoID: req.file.id,
    //     logoURL: `http://localhost/api/images/shop/${req.file.id}`,
    //   });
    //   await User.findByIdAndUpdate(req.user.id, {
    //     shopID: company._id,
    //   });
    // } else {
    //   company = await Shop.create(data);
    //   await User.findByIdAndUpdate(req.user.id, {
    //     shopID: company._id,
    //   });
    // }
    return res.status(201).json({
      success: true,
      message: "Shop Created Successfully",
      details: data,
    });
  } catch (error) {
    next(error);
  }
};

export default createOrder;
