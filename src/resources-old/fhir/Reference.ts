export class Reference {
  reference: string;

  constructor(resourceType: string, resourceId: string) {
    this.reference = `${resourceType}/${resourceId}`;
  }
}
