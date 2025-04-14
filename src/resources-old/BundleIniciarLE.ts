import { Bundle } from "./fhir/Bundle";
import { MessageHeaderLE } from "./MessageHeaderLE";
import { TipoEventoLE } from "./types";

export class BundleIniciarLE extends Bundle {
  constructor(params: Params) {
    super({
      type: "message",
      profile: [
        "https://interoperabilidad.minsal.cl/fhir/ig/tei/StructureDefinition/BundleIniciarLE",
      ],
    });

    this.addEntry(
      new MessageHeaderLE({
        codigoTipoEventoLE: "iniciar",
        idRolProfesional: "1234",
        source: {
          endpoint: "http:10.67.84.165:8080",
          software: "AGENDA-WEB",
        },
      })
    );
  }
}

type Params = {
  rolProfesional: {
    id: string;
  };
};

type Result = {};
