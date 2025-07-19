import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { tourServices } from "./services.tour";
import { sendResponse } from "../../../utils/sendResponse";

const createTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tourType = await tourServices.createTourType(req.body);

    sendResponse(res, { status: 201, success: true, data: tourType });
  }
);

const createTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newTour = await tourServices.createTour(req.body);

    sendResponse(res, {
      status: 201,
      success: true,
      data: newTour,
    });
  }
);

const getAllTours = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { result, totalCount, page, totalPage, limit } =
      await tourServices.getAllTours(req);
    sendResponse(res, {
      status: 201,
      success: true,
      data: { total: totalCount, totalPage, currentPage: page, limit, result },
    });
  }
);

export const TourController = { createTourType, createTour, getAllTours };
