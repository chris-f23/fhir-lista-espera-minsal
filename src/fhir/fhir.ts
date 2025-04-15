import { Coding } from "./datatypes/Coding";
import fs from "fs";

import { isIn } from "validator";
import { createCodeSystem } from "./utils";

type CodeSystems = Record<string, Coding[]>;

export class FHIR {
  private valueSets: ValueSet[];

  constructor() {
    this.valueSets = loadValueSets();
  }

  getValueSetCodes(name: string) {
    const valueSetFound = this.valueSets.find(
      (valueSet) => valueSet.name === name
    );

    if (valueSetFound === undefined) {
      throw new Error(`ValueSet ${name} not found`);
    }

    return valueSetFound.codes;
  }
}

type ValueSet = {
  name: string;
  codes: { system: string; code: string; display: string }[];
};

function loadCodeSystem(name: string) {
  const raw = fs.readFileSync(`./Artifacts/CodeSystem/${name}.json`, "utf-8");
  const json = JSON.parse(raw);

  const system = json["url"];
  const codes = json["concept"].map((concept: any) => {
    return {
      code: concept["code"],
      display: concept["display"],
    };
  });
  return createCodeSystem(system, codes);
}

function loadValueSets() {
  const codeSystemNames = fs
    .readdirSync("./Artifacts/CodeSystem")
    .map((name) => name.replace(".json", ""));

  const valueSets: ValueSet[] = [];
  for (const valueSet of fs.readdirSync("./Artifacts/ValueSet")) {
    const jsonValueSet = JSON.parse(
      fs.readFileSync(`./Artifacts/ValueSet/${valueSet}`, "utf-8")
    );

    const valueSetEntry: ValueSet = {
      name: valueSet.replace(".json", ""),
      codes: [],
    };

    if (jsonValueSet["compose"] === undefined) {
      continue;
    }

    if (jsonValueSet["compose"]["include"] === undefined) {
      continue;
    }

    const backbones = jsonValueSet["compose"]["include"];

    if (backbones.length === 0) {
      continue;
    }

    for (const backbone of backbones) {
      const system = backbone["system"] as undefined | string;
      const concept = backbone["concept"] as
        | undefined
        | { code: string; display: string }[];

      if (system === undefined) {
        continue;
      }

      if (concept !== undefined) {
        valueSetEntry.codes.push(
          ...concept.map((code) => ({ system, ...code }))
        );
        continue;
      }

      const systemName = system.split("/").pop();
      const codeSystemName = codeSystemNames.find((cs) => cs === systemName);

      if (!isIn(systemName, codeSystemNames)) {
        continue;
      }

      // console.info(
      //   `Found code system '${codeSystemName}' while loading value set '${valueSet}'.`
      // );

      const codeSystem = loadCodeSystem(codeSystemName);

      valueSetEntry.codes.push(
        ...codeSystem.map((c): ValueSet["codes"][number] => ({
          system,
          code: c.code,
          display: c.display,
        }))
      );
    }

    valueSets.push(valueSetEntry);
  }
  return valueSets;
}
