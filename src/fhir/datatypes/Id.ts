import { z } from "zod";

export const idSchema = z.string().regex(/[A-Za-z0-9\-\.]{1,64}/);
