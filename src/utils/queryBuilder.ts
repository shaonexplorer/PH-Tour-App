import { Query } from "mongoose";

export class QueryBuilder {
  public modelQuery: Query<any, any>;
  public query: any;
  constructor(modelQuery: Query<any, any>, query: any) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter(excludeFields: string[]) {
    const filter = { ...this.query };

    for (const field of excludeFields) {
      delete filter[field];
    }

    this.modelQuery = this.modelQuery.find(filter);

    return this;
  }

  search(searchAbleFields: string[]) {
    const searchTerm = (this.query.searchTerm as string) || "";

    const searchQuery = searchAbleFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    }));

    this.modelQuery = this.modelQuery.find({
      $or: searchQuery,
    });

    return this;
  }

  selectFields() {
    const rawFields = this.query.fields;
    const fields = rawFields ? (rawFields as string).split(",").join(" ") : "";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  sort() {
    const sort = (this.query.sort as string) || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  pagination() {
    const limit = Number(this.query.limit) || 10;
    const page = Number(this.query.page) || 1;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
}
