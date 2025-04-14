import { Reference } from "./fhir/Reference";
import { Resource } from "./fhir/Resource";

export class MessageHeaderLE extends Resource<Result> {
  eventCoding: { system: string; code: CSTipoEventoLE };
  author: Reference;

  constructor(params: Params) {
    super({
      resourceType: "MessageHeader",
      meta: {
        profile: [
          "https://interoperabilidad.minsal.cl/fhir/ig/tei/StructureDefinition/MessageHeaderLE",
        ],
      },
    });

    this.eventCoding = {
      system:
        "https://interoperabilidad.minsal.cl/fhir/ig/tei/CodeSystem/CSTipoEventoLE",
      code: params.codigoTipoEventoLE,
    };

    this.author = new Reference("PractitionerRoleLE", params.idRolProfesional);
  }

  toResult(): Result {
    return {};
  }
}

type CSTipoEventoLE =
  | "iniciar"
  | "referenciar"
  | "revisar"
  | "priorizar"
  | "agendar"
  | "atender"
  | "terminar";

type Params = {
  idRolProfesional: string;
  codigoTipoEventoLE: CSTipoEventoLE;
  source: {
    software: string;
    endpoint: string;
  };
};

type Result = {};
