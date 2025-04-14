import * as UUID from "uuid";

export abstract class Resource<TResult extends {}> {
  id: string;
  text: {
    status: "generated";
    div: string;
  };
  resourceType: string;
  meta: {
    profile: string[];
    lastUpdated?: string;
  };

  constructor({
    resourceType,
    meta,
  }: {
    resourceType: string;
    meta: {
      profile: string[];
      lastUpdated?: string;
    };
  }) {
    this.id = UUID.v4();
    this.resourceType = resourceType;
    this.meta = meta;
  }

  public generateText() {
    this.text = {
      div: `<div xmlns="http://www.w3.org/1999/xhtml">${this.resourceType}</div>`,
      status: "generated",
    };
  }

  abstract toResult(): TResult;
}
