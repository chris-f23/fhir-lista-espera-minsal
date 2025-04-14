import { Bundle } from "./resources-old/fhir/Bundle";

export function crearBundleIniciar() {
  return new Bundle({
    entry: [],
    profile: [
      "https://interoperabilidad.minsal.cl/fhir/ig/tei/StructureDefinition/BundleIniciarLE",
    ],
  });
}

type Params = {};
