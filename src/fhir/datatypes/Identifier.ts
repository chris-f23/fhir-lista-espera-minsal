import { z } from "zod";
import { codeableConceptSchema } from "./CodeableConcept";
import { periodSchema } from "./Period";
import { referenceSchema } from "./Reference";
import { codeSchema } from "./Code";

export const identifierSchema = z.object({
  use: codeSchema
    .superRefine((arg, ctx) => {
      if (
        ["usual", "official", "temp", "secondary", "old"].includes(arg) ===
        false
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Identifier.use must be a valid code",
        });
      }
    })
    .optional(),
  type: codeableConceptSchema.optional(),
  system: z.string().optional(),
  period: periodSchema.optional(),
  assigner: referenceSchema.optional(),
});
