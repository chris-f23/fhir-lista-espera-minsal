import { z } from "zod";
import { Identifier, identifierSchema } from "../fhir/datatypes/Identifier";
import { idSchema } from "../fhir/datatypes/Id";
import { codeSchema, codeSchemaWithBinding } from "../fhir/datatypes/Code";
import {
  codeableConceptSchema,
  codeableConceptSchemaWithBinding,
} from "../fhir/datatypes/CodeableConcept";
import { metaSchema } from "../fhir/datatypes/Meta";
import { modalidadAtencionValueSet } from "./ModalidadAtencionValueSet";
import { referenceSchema } from "../fhir/datatypes/Reference";
import { dateTimeSchema } from "../fhir/datatypes/DateTime";
import { narrativeSchema } from "../fhir/datatypes/Narrative";
import {
  extensionSchema,
  extensionSchemaFromSlices,
} from "../fhir/datatypes/Extension";
import {
  createCodeSystem,
  generateCodeSystemFromArtifact,
} from "../fhir/utils";
import { FHIR } from "../fhir/fhir";

export const serviceRequestSchema = (fhir: FHIR) => {
  return z
    .object({
      id: idSchema,
      resourceType: codeSchema.and(z.literal("ServiceRequest")),
      meta: z.optional(metaSchema),
      text: z.optional(narrativeSchema),
      identifier: z
        .array(
          identifierSchema.merge(
            z.object<Identifier>({
              value: z.string(),
            })
          )
        )
        .optional(),
      status: codeSchema.and(z.literal("draft")),
      intent: codeSchema.and(z.literal("order")),
      category: z
        .array(
          codeableConceptSchemaWithBinding({
            binding: modalidadAtencionValueSet,
            min: 1,
            max: 1,
          })
        )
        .length(1),
      priority: codeSchemaWithBinding({
        binding: ["routine", "urgent", "asap", "stat"],
      }),
      code: codeableConceptSchemaWithBinding({
        binding: fhir.getValueSetCodes("VSServicioRequerido"),
        min: 1,
        max: 1,
      }),
      subject: referenceSchema,
      encounter: z.optional(referenceSchema),
      authoredOn: z.optional(dateTimeSchema),
      requester: z.optional(referenceSchema),
      performer: z.array(referenceSchema).optional(),
      locationCode: z
        .array(
          codeableConceptSchemaWithBinding({
            binding: fhir.getValueSetCodes("VSDestinoReferenciaCodigo"),
            min: 0,
            max: 1,
          })
        )
        .optional(),
      reasonCode: z
        .array(
          codeableConceptSchemaWithBinding({
            binding: fhir.getValueSetCodes("VSDerivadoParaCodigo"),
            min: 0,
            max: 1,
          })
        )
        .optional(),
      supportingInfo: z.array(referenceSchema).optional(),
      extension: extensionSchemaFromSlices({
        slices: [
          extensionSchema({
            type: "CodeableConcept",
            url: "https://interoperabilidad.minsal.cl/fhir/ig/tei/StructureDefinition/ExtensionMotivoCierreInterconsulta",
            schema: codeableConceptSchemaWithBinding({
              binding: fhir.getValueSetCodes("VSMotivoCierreInterconsulta"),
              min: 0,
              max: 1,
            }),
          }),
          extensionSchema({
            type: "Boolean",
            url: "https://interoperabilidad.minsal.cl/fhir/ig/tei/StructureDefinition/ExtensionBoolRequiereExamen",
            schema: z.boolean(),
          }),
          extensionSchema({
            type: "Boolean",
            url: "https://interoperabilidad.minsal.cl/fhir/ig/tei/StructureDefinition/ExtensionBoolResolutividadAPS",
            schema: z.boolean(),
          }),
          extensionSchema({
            url: "https://interoperabilidad.minsal.cl/fhir/ig/tei/StructureDefinition/ExtensionOrigenInterconsulta",
            type: "CodeableConcept",
            schema: codeableConceptSchemaWithBinding({
              binding: fhir.getValueSetCodes("VSorigenInterconsulta"),
              min: 0,
              max: 1,
            }),
          }),
          extensionSchema({
            url: "https://interoperabilidad.minsal.cl/fhir/ig/tei/StructureDefinition/ExtensionStringFundamentoPriorizacion",
            type: "String",
            schema: z.string().optional(),
          }),
          extensionSchema({
            url: "https://interoperabilidad.minsal.cl/fhir/ig/tei/StructureDefinition/ExtensionEstadoInterconsultaCodigoLE",
            type: "CodeableConcept",
            schema: codeableConceptSchemaWithBinding({
              binding: fhir.getValueSetCodes("VSEstadoInterconsulta"),
              min: 1,
              max: 1,
            }),
          }),
          extensionSchema({
            url: "https://interoperabilidad.minsal.cl/fhir/ig/tei/StructureDefinition/ExtensionEspecialidadMedicaDestinoCodigo",
            type: "CodeableConcept",
            schema: codeableConceptSchemaWithBinding({
              binding: fhir.getValueSetCodes("VsEspecialidadDest"),
              min: 0,
              max: 1,
            }),
          }),
          extensionSchema({
            url: "https://interoperabilidad.minsal.cl/fhir/ig/tei/StructureDefinition/ExtensionSubEspecialidadMedicaDestinoCodigo",
            type: "CodeableConcept",
            schema: codeableConceptSchemaWithBinding({
              binding: fhir.getValueSetCodes("VsEspecialidadDest"),
              min: 0,
              max: 1,
            }),
          }),
          extensionSchema({
            url: "https://interoperabilidad.minsal.cl/fhir/ig/tei/StructureDefinition/ExtensionPertinenciaInterconsulta",
            type: "CodeableConcept",
            schema: codeableConceptSchemaWithBinding({
              binding: fhir.getValueSetCodes("VsEspecialidadDest"),
              min: 0,
              max: 1,
            }),
          }),
        ],
      }),
    })
    .strict();
};
