import { z } from "zod";

export const codeSchema = z.string().regex(/[^\s]+(\s[^\s]+)*/);
