import { Resource } from "./fhir/Resource";

export class PrestadorAdministrativoLE extends Resource<Result> {
  constructor() {
    super({
      resourceType: "PrestadorAdministrativoLE",
      meta: {
        profile: [
          "https://interoperabilidad.minsal.cl/fhir/ig/tei/StructureDefinition/PrestadorAdministrativoLE",
        ],
      },
    });
  }

  toResult(): Result {
    return {};
  }
}

type Result = {};
