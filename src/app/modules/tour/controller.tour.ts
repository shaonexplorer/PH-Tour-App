import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { tourServices } from "./services.tour";
import { sendResponse } from "../../utils/sendResponse";

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

const getSingleTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const tour = await tourServices.getSingleTour(slug);
    sendResponse(res, {
      status: 200,
      success: true,
      data: tour,
    });
  }
);

const updateTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const tour = await tourServices.updateTour(id, req);
    sendResponse(res, {
      status: 200,
      success: true,
      data: tour,
    });
  }
);

export const TourController = {
  createTourType,
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
};
