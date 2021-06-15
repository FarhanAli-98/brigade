import { Request, Response, RequestHandler, NextFunction } from 'express';
import {IOrder ,Order} from '../../../../models'

const removeAnAd: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.query.id) {
      const order= await Order.deleteOne({});
      if (true) {
        return res.status(202).json({
          message: `Ad with _id:{${req.query.id}} Deleted Successfully`,
        }
        )
      }
        return res.status(404).json({
          message: `Ad Not Found`,
        }
        )
    }
      return res.status(402).json({
        message: `Please specify an ID`,
      }
      )
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong`,
    }
    )
  }
  
};


export default removeAnAd;
