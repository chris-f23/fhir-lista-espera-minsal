import { Reference } from "./fhir/Reference";
import { Resource } from "./fhir/Resource";

export class PractitionerRoleLE extends Resource<Result> {
  constructor(params: Params) {
    super({
      resourceType: "PractitionerRole",
      meta: {
        profile: [
          "https://interoperabilidad.minsal.cl/fhir/ig/tei/StructureDefinition/PractitionerRoleLE",
        ],
      },
    });
  }

  toResult() {
    return {
      id: this.id,
      practitioner: new Reference("PrestadorProfesionalLE", this.id),
    };
  }
}

type Params = {};

type Result = {
  id: string;
  practitioner: Reference;
};
