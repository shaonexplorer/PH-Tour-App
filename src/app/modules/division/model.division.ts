import { model, Schema } from "mongoose";
import { IDivision } from "./interface.division";

const divisionSchema = new Schema<IDivision>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    thumbnail: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

divisionSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    const slug = this.name.toLowerCase().split(" ").join("-");
    this.slug = slug;
  }
  next();
});

divisionSchema.pre("findOneAndUpdate", async function (next) {
  const division = this.getUpdate() as IDivision;
  if (division.name) {
    const slug = division.name.toLowerCase().split(" ").join("-");

    division.slug = slug;
    this.setUpdate(division);
  }
  next();
});

export const Division = model<IDivision>("Division", divisionSchema);
