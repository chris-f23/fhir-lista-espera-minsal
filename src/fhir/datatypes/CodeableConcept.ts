import { z } from "zod";
import { Coding, codingSchema } from "./Coding";

export const codeableConceptSchema = z
  .object({
    coding: z.array(codingSchema).optional(),
    text: z.string().optional(),
  })
  .strict();

export const codeableConceptSchemaWithBinding = (params: {
  binding: Coding[];
  min?: number;
  max?: number;
}) => {
  return codeableConceptSchema.superRefine((arg, ctx) => {
    if (params.max && arg.coding.length > params.max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CodeableConcept.coding must have only one coding",
      });
    }

    if (params.min && arg.coding.length < params.min) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CodeableConcept.coding must have at least one coding",
      });
    }

    if (
      params.binding.find(
        (validCoding) =>
          arg.coding[0].system === validCoding.system &&
          arg.coding[0].code === validCoding.code
      ) === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CodeableConcept.coding must be a valid code",
      });
    }
  });
};
