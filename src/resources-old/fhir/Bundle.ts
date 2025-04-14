import { Resource } from "./Resource";
import { BackboneElement } from "../types";
import { DateTime } from "luxon";

export class Bundle extends Resource<Result> {
  type: string;
  timestamp: string;
  entry: BackboneElement[];

  constructor(params: { type: "message"; profile: string[] }) {
    super({
      resourceType: "Bundle",
      meta: {
        profile: params.profile,
        lastUpdated: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mmZZ"),
      },
    });

    this.type = params.type;
    this.timestamp = DateTime.now().toISO();
    this.entry = [];
    this.meta.profile = params.profile;
  }

  addEntry(resource: Resource<any>) {
    this.entry.push({
      fullUrl: `http://interoperabilidad.minsal.cl/fhir/ig/tei/${resource.resourceType}/${resource.id}`,
      resource: resource,
    });
  }

  public toResult(): Result {
    return {
      id: this.id,
      type: this.type,
      meta: this.meta,
      timestamp: this.timestamp,
      entry: this.entry,
    };
  }
}

type Result = {
  id: string;
  type: string;
  meta: any;
  timestamp: string;
  entry: BackboneElement[];
};
