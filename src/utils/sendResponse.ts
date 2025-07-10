import { Response } from "express";

interface TResponse<T> {
  status: number;
  success: boolean;
  data: T;
}

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.status).json({ success: data.success, data: data.data });
};
