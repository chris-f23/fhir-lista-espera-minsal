import { z } from "zod";
import { codeableConceptSchemaWithBinding } from "./CodeableConcept";
import { periodSchema } from "./Period";
import { referenceSchema } from "./Reference";
import { codeSchemaWithBinding } from "./Code";
import { createCodeSystem } from "../utils";

const V20203CodeSystem = createCodeSystem(
  "http://terminology.hl7.org/CodeSystem/v2-0203",
  [
    { code: "DL" },
    { code: "PPN" },
    { code: "BRN" },
    { code: "MR" },
    { code: "MCN" },
    { code: "EN" },
    { code: "TAX" },
    { code: "NIIP" },
    { code: "PRN" },
    { code: "MD" },
    { code: "DR" },
    { code: "ACSN" },
    { code: "UDI" },
    { code: "SNO" },
    { code: "SB" },
    { code: "PLAC" },
    { code: "FILL" },
    { code: "JHN" },
  ]
);

export const identifierSchema = z
  .object({
    id: z.string().optional(),
    use: codeSchemaWithBinding({
      binding: ["usual", "official", "temp", "secondary", "old"],
    }).optional(),
    type: codeableConceptSchemaWithBinding({
      binding: [...V20203CodeSystem],
      min: 1,
      max: 1,
    }).optional(),
    value: z.string().optional(),
    system: z.string().optional(),
    period: periodSchema.optional(),
    assigner: referenceSchema.optional(),
  })
  .strict();

export type Identifier = z.infer<typeof identifierSchema>;
