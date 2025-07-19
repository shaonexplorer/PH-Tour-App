import { Types } from "mongoose";
import { IDivision } from "./interface.division";
import { Division } from "./model.division";

const createDivision = async (payload: Partial<IDivision>) => {
  const newDivision = await Division.create(payload);

  return newDivision;
};

const getDivisions = async () => {
  const divisions = await Division.find();

  return divisions;
};

const updateDivisionById = async (id: string, payload: Partial<IDivision>) => {
  const updatedDivision = await Division.findOneAndUpdate(
    { _id: id },
    payload,
    {
      runValidators: true,
      new: true,
    }
  );

  return updatedDivision;
};

export const divisionServices = {
  createDivision,
  getDivisions,
  updateDivisionById,
};
