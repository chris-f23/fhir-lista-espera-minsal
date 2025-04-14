import { Resource } from "./fhir/Resource";

export class PrestadorProfesionalLE extends Resource<Result> {
  constructor() {
    super({ resourceType: "PrestadorProfesionalLE", meta: { profile: [] } });
  }

  toResult() {
    return {
      id: this.id,
    };
  }
}

type Result = { id: string };
