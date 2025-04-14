import { z } from "zod";
import { codingSchema } from "./Coding";

export const codeableConceptSchema = z.object({
  coding: z.array(codingSchema).optional(),
  text: z.string().optional(),
});
