import { Request } from "express";
import { Tour } from "../tour/tour.model";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { initPayment, IPaymentData } from "../sslcommerz/init.payment";
import { User } from "../user/user.model";

const createBooking = async (req: Request) => {
  const token = req.headers.authorization;
  const decodedToken: any = jwt.verify(
    token as string,
    process.env.JWT_SECRET as string
  );
  const userId = decodedToken.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const transactionId = `txn_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  const tourId = req.body.tour;
  const tour = await Tour.findById(tourId);
  if (!tour) {
    throw new Error("Tour not found");
  }
  const totalAmount = (tour.costFrom as number) * req.body.guestCount;

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.create(
      [{ tour: tourId, user: userId, guestCount: req.body.guestCount }],
      { session }
    );

    const payment = await Payment.create(
      [{ booking: booking[0]._id, amount: totalAmount, transactionId }],
      {
        session,
      }
    );

    const paymentData: IPaymentData = {
      customerEmail: user.email,
      customerName: user.name,
      customerPhone: user.phone as string,
      totalAmount,
      transactionId,
    };

    const { GatewayPageURL } = await initPayment(paymentData);

    await session.commitTransaction();
    session.endSession();

    return { booking, payment, paymentResponse: GatewayPageURL };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const Bookingservices = { createBooking };
