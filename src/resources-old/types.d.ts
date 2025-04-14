import { Resource } from "./fhir/Resource";

type BackboneElement = {
  fullUrl: string;
  resource: Resource<any>;
};

export enum TipoEventoLE {
  INICIAR,
  REFERENCIAR,
  REVISAR,
  PRIORIZAR,
  AGENDAR,
  ATENDER,
  TERMINAR,
}
