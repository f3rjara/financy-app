
export class IngresoEgreso {
  sort(arg0: (a: any, b: any) => 1 | -1): IngresoEgreso[] {
    throw new Error('Method not implemented.');
  }

  constructor( 
    public description: string,
    public amount: number,
    public type: string,
    /* public uid?: string, */
  ){ }
  
}