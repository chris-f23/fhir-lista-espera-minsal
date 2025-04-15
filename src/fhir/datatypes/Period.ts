import { z } from "zod";

export const periodSchema = z
  .object({
    start: z.string().datetime().optional(),
    end: z.string().datetime().optional(),
  })
  .strict();
