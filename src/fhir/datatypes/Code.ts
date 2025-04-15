import { z } from "zod";
import validator from "validator";
export const codeSchema = z.string().regex(/[^\s]+(\s[^\s]+)*/);

export type Code = z.infer<typeof codeSchema>;

export const codeSchemaWithBinding = (params: { binding: Code[] }) => {
  return codeSchema.superRefine((arg, ctx) => {
    if (!validator.isIn(arg, params.binding)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Code must be a valid code",
      });
    }
  });
};
