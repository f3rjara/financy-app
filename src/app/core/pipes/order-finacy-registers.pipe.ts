import { IngresoEgreso } from 'src/app/core/models/ingreso-egreso.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderFinacyRegisters'
})
export class OrderFinacyRegistersPipe implements PipeTransform {

  transform( items: IngresoEgreso[] ): IngresoEgreso[] {
    return  items.sort( (a,b) => {
      if ( a.type === 'ingreso' ) {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
