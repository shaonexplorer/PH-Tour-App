import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { divisionServices } from "./services.division";
import { sendResponse } from "../../utils/sendResponse";

const createDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const division = await divisionServices.createDivision(req.body);

    sendResponse(res, { status: 201, success: true, data: division });
  }
);

const getDivisions = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const divisions = await divisionServices.getDivisions();

    sendResponse(res, { status: 200, success: true, data: divisions });
  }
);

const updateDivisionById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedDivision = await divisionServices.updateDivisionById(
      req.params.id,
      req.body
    );

    sendResponse(res, { status: 200, success: true, data: updatedDivision });
  }
);

export const divisionController = {
  createDivision,
  getDivisions,
  updateDivisionById,
};
