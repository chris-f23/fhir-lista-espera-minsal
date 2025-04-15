import { z } from "zod";

export const codingSchema = z
  .object({
    system: z.string(),
    version: z.string().optional(),
    code: z.string(),
    display: z.string().optional(),
    userSelected: z.boolean().optional(),
  })
  .strict();
export type Coding = z.infer<typeof codingSchema>;
