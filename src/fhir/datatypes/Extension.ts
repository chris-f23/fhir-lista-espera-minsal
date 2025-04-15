import { z } from "zod";
import { uriSchema } from "./Uri";

type ValueType =
  | "Base64Binary"
  | "Boolean"
  | "Canonical"
  | "Code"
  | "Date"
  | "DateTime"
  | "Decimal"
  | "Id"
  | "Instant"
  | "Integer"
  | "Markdown"
  | "Oid"
  | "PositiveInt"
  | "String"
  | "Time"
  | "UnsignedInt"
  | "Uri"
  | "Url"
  | "Uuid"
  | "Address"
  | "Age"
  | "Annotation"
  | "Attachment"
  | "CodeableConcept"
  | "Coding"
  | "ContactPoint"
  | "Count"
  | "Distance"
  | "Duration"
  | "HumanName"
  | "Identifier"
  | "Money"
  | "Period"
  | "Quantity"
  | "Range"
  | "Ratio"
  | "Reference"
  | "SampledData"
  | "Signature"
  | "Timing"
  | "ContactDetail"
  | "Contributor"
  | "DataRequirement"
  | "Expression"
  | "ParameterDefinition"
  | "RelatedArtifact"
  | "TriggerDefinition"
  | "UsageContext"
  | "Dosage"
  | "Meta";

type ExtensionSchemaFn = (params: {
  type: ValueType;
  url: string;
  schema: z.ZodType;
}) => z.ZodType;

export const extensionSchema: ExtensionSchemaFn = (params) => {
  const valueKey = `value${params.type}`;

  return z.object({
    url: uriSchema.and(z.literal(params.url)),
    [valueKey]: params.schema,
  });
};

type ExtensionSchemaFnResult = ReturnType<ExtensionSchemaFn>;

export const extensionSchemaFromSlices = (params: {
  slices: ExtensionSchemaFnResult[];
}) => {
  if (params.slices.length === 0) {
    throw new Error("At least one slice is required");
  }

  let schema = params.slices[0];

  for (const slice of params.slices.slice(1)) {
    schema = schema.or(slice);
  }

  return z.array(schema);
};
