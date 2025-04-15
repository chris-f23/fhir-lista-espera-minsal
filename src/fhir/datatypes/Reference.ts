import { z } from "zod";
import { identifierSchema } from "./Identifier";

export const referenceSchema = z
  .object({
    reference: z.string().optional(),
    type: z.string().optional(),
    identifier: z.optional(identifierSchema),
    display: z.string().optional(),
  })
  .strict();
