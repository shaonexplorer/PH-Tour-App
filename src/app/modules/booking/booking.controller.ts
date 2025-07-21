import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Bookingservices } from "./booking.services";

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { booking, payment, paymentResponse } =
      await Bookingservices.createBooking(req);

    sendResponse(res, {
      data: { booking, payment, paymentResponse },
      success: true,
      status: 201,
    });
  }
);

export const BookingController = {
  createBooking,
};
