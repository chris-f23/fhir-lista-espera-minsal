import fs from "fs";

import { serviceRequestSchema } from "./implementation/ServiceRequestLE";
import { printZodError } from "./print-zod-error";
import { FHIR } from "./fhir/fhir";

const bundleInicio = JSON.parse(
  fs.readFileSync("./bundles/1.iniciar.json", "utf-8")
);

const serviceRequest = bundleInicio["entry"][1]["resource"];

const fhir = new FHIR();
const result = serviceRequestSchema(fhir).safeParse({
  ...serviceRequest,
  extension: [
    ...serviceRequest["extension"],
    {
      extension: [
        {
          url: "EvaluacionPertinencia",
          valueCodeableConcept: {
            coding: [
              {
                system:
                  "https://interoperabilidad.minsal.cl/fhir/ig/tei/CodeSystem/CSPertinenciaInterconsulta",
                code: "3",
                display: "Pertinente Incompleta",
              },
            ],
          },
        },
      ],
      url: "https://interoperabilidad.minsal.cl/fhir/ig/tei/StructureDefinition/ExtensionPertinenciaInterconsulta",
    },
  ],
});

if (result.error) {
  printZodError(result.error);
}
