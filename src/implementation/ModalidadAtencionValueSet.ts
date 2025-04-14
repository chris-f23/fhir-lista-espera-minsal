import { Coding } from "../fhir/datatypes/Coding";

export const modalidadAtencionValueSet: Array<Coding> = [
  {
    code: "1",
    system:
      "https://interoperabilidad.minsal.cl/fhir/ig/tei/CodeSystem/CSModalidadAtencionCodigo",
    display: "Presencial",
  },
  {
    code: "2",
    system:
      "https://interoperabilidad.minsal.cl/fhir/ig/tei/CodeSystem/CSModalidadAtencionCodigo",
    display: "Remota",
  },
  {
    code: "3",
    system:
      "https://interoperabilidad.minsal.cl/fhir/ig/tei/CodeSystem/CSModalidadAtencionCodigo",
    display: "Telemedicina",
  },
];
