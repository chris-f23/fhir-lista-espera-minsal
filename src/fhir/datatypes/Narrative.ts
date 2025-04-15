import { z } from "zod";
import { codeSchema, codeSchemaWithBinding } from "./Code";

export const narrativeSchema = z.object({
  status: codeSchemaWithBinding({
    binding: ["generated", "extensions", "additional", "empty"],
  }),
  div: z.string(),
});
