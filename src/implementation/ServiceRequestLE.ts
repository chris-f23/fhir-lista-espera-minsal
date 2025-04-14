import { z } from "zod";
import { identifierSchema } from "../fhir/datatypes/Identifier";
import { idSchema } from "../fhir/datatypes/Id";
import { codeSchema } from "../fhir/datatypes/Code";
import { codeableConceptSchema } from "../fhir/datatypes/CodeableConcept";
import { metaSchema } from "../fhir/datatypes/Meta";
import { modalidadAtencionValueSet } from "./ModalidadAtencionValueSet";
import { referenceSchema } from "../fhir/datatypes/Reference";
import { dateTimeSchema } from "../fhir/datatypes/DateTime";

export const serviceRequestSchema = z
  .object({
    id: idSchema,
    resourceType: codeSchema.and(z.literal("ServiceRequest")),
    meta: z.optional(metaSchema),
    identifier: z.array(identifierSchema).optional(),
    status: codeSchema.and(z.literal("draft")),
    intent: codeSchema.and(z.literal("order")),
    category: z
      .array(
        codeableConceptSchema.superRefine((arg, ctx) => {
          if (arg.coding.length > 1) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "ServiceRequest.category[0].coding must have only one coding",
            });
          }

          if (
            modalidadAtencionValueSet.find(
              (validCoding) =>
                arg.coding[0].system === validCoding.system &&
                arg.coding[0].code === validCoding.code
            ) === undefined
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "ServiceRequest.category[0].coding must be a valid code",
            });
          }
        })
      )
      .superRefine((arg, ctx) => {
        if (arg.length > 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "ServiceRequest.category must have only one element",
          });
        }
      }),
    priority: codeSchema.and(z.enum(["routine", "urgent", "asap", "stat"])),
    code: codeableConceptSchema.superRefine((arg, ctx) => {
      if (arg.coding.length > 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ServiceRequest.code.coding must have only one coding",
        });
      }

      if (arg.coding.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ServiceRequest.code.coding must have at least one coding",
        });
      }

      if (
        arg.coding[0].system !== "http://snomed.info/sct" &&
        arg.coding[0].code !== "103696004"
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ServiceRequest.code.coding must be a valid code",
        });
      }
    }),
    subject: referenceSchema,
    encounter: referenceSchema,
    authoredOn: dateTimeSchema,
    requester: referenceSchema,
    supportingInfo: z.array(referenceSchema).optional(),
  })
  .strict();
