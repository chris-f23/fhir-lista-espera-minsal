import { Coding } from "./datatypes/Coding";
import fs from "fs";
import path from "path";

export const createCodeSystem = (
  system: string,
  codes: Omit<Coding, "system">[]
): Coding[] => {
  return codes.map((code) => ({ system, ...code }));
};

export const generateCodeSystemFromArtifact = (artifactName: string) => {
  const fullPath = path.join(
    __dirname,
    "..",
    "..",
    "Artifacts",
    "CodeSystem",
    `${artifactName}.json`
  );

  const json = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

  const system = json["url"];
  const codes = json["concept"].map((concept: any) => {
    return {
      code: concept["code"],
      display: concept["display"],
    };
  });
  return createCodeSystem(system, codes);
};
