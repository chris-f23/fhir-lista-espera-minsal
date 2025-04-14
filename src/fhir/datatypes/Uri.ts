import { z } from "zod";

export const uriSchema = z.string().regex(/\S*/);
