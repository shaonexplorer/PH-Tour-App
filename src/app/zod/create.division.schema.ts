import z from "zod";

export const zodDivisionSchema = z.object({
  name: z.string(),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
});

export const zodDivisionSchemaUpdate = z.object({
  name: z.string().optional(),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
});
