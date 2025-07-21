import { Request } from "express";
import { ITourType } from "./interface.tour";
import { Tour, TourType } from "./tour.model";
import { QueryBuilder } from "../../utils/queryBuilder";

const createTourType = async (payload: Partial<ITourType>) => {
  const tourType = await TourType.create(payload);

  return tourType;
};

const createTour = async (payload: any) => {
  const newTour = await Tour.create(payload);
  return newTour;
};

const getAllTours = async (req: Request) => {
  // const filter = (req.query.location as string) || "";
  // const searchTerm = (req.query.searchTerm as string) || "";
  // const rawFields = req.query.fields;
  // const fields = rawFields ? (rawFields as string).split(",").join(" ") : "";

  // const sort = req.query.sort as string;

  // const limit = Number(req.query.limit) || 10;
  // const page = Number(req.query.page) || 1;
  // const skip = (page - 1) * limit;

  // const totalCount = await Tour.countDocuments();
  // const totalPage = Math.ceil(totalCount / limit);

  // const tours = await Tour.find({ location: { $regex: filter, $options: "i" } })
  //   .find({
  //     $or: [
  //       { title: { $regex: searchTerm, $options: "i" } },
  //       { description: { $regex: searchTerm, $options: "i" } },
  //       { location: { $regex: searchTerm, $options: "i" } },
  //     ],
  //   })
  //   .select(fields)
  //   .sort(sort)
  //   .skip(skip)
  //   .limit(limit);

  const query = new QueryBuilder(Tour.find(), req.query);

  const result = await query
    .filter(["page", "sort", "limit", "fields", "searchTerm"])
    .search(["title", "description", "location"])
    .selectFields()
    .sort()
    .pagination().modelQuery;

  const totalCount = await Tour.countDocuments();
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const totalPage = Math.ceil(totalCount / limit);

  return { result, totalCount, page, totalPage, limit };
};

const getSingleTour = async (slug: string) => {
  const tour = await Tour.findOne({ slug });
  return tour;
};

const updateTour = async (id: string, req: Request) => {
  const tour = await Tour.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  return tour;
};

export const tourServices = {
  createTourType,
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
};
