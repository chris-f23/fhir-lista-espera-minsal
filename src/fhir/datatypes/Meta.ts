import { z } from "zod";
import { idSchema } from "./Id";
import { instantSchema } from "./Instant";
import { uriSchema } from "./Uri";
import { codingSchema } from "./Coding";

export const metaSchema = z.object({
  versionId: z.optional(idSchema),
  lastUpdated: z.optional(instantSchema),
  source: z.optional(uriSchema),
  profile: z.array(z.string()).optional(),
  security: z.array(codingSchema).optional(),
  tag: z.array(codingSchema).optional(),
});
