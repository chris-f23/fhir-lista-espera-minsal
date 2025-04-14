// import { crearBundleIniciar } from "./bundle-iniciar";
// import { Bundle } from "./resources-old/fhir/Bundle";
// import { BundleIniciarLE } from "./resources-old/BundleIniciarLE";

import { serviceRequestSchema } from "./implementation/ServiceRequestLE";

// const bundleIniciar = new BundleIniciarLE({
//   rolProfesional: { id: "1234" },
// });
// console.log(bundleIniciar.toResult());

const a = serviceRequestSchema.parse({
  resourceType: "ServiceRequest",
  id: "SolicitudInterconsultaEjemplo",
  meta: {
    profile: [
      "https://interoperabilidad.minsal.cl/fhir/ig/tei/StructureDefinition/ServiceRequestLE",
    ],
  },
  identifier: [
    {
      value: "123",
    },
  ],
  status: "draft",
  intent: "order",
  category: [
    {
      coding: [
        {
          system:
            "https://interoperabilidad.minsal.cl/fhir/ig/tei/CodeSystem/CSModalidadAtencionCodigo",
          code: "1",
          display: "Presencial",
        },
      ],
    },
  ],

  priority: "routine",
  code: {
    coding: [
      {
        system: "http://snomed.info/sct",
        code: "103696004",
      },
    ],
    text: "Interconsulta para atención presencial",
  },

  subject: {
    reference: "Patient/EjemploPatientLE",
  },
  encounter: {
    reference: "Encounter/EncounterIniciarEjemplo",
  },
  authoredOn: "2024-12-10T09:00:00Z",
  requester: {
    reference: "PractitionerRole/PractitionerRoleIniciador",
  },
});
