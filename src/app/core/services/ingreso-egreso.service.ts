import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor( private firestore: AngularFirestore, private authApp: AuthService ) { }

  createIngresoEgreso( ingresoEgreso: IngresoEgreso ) {
    const _uid = this.authApp.userActive.uid;
    return  this.firestore.doc( `${_uid}/ingresos-egresos` )
                .collection( 'items' )
                .add( { ...ingresoEgreso } ); 
  }


  initIngresoEgresoListener( uid: string ) {
    return this.firestore.collection( `${uid}/ingresos-egresos/items` )
                .snapshotChanges()
                .pipe(
                  map( snapshot => {
                    return snapshot.map( doc => {
                      return {
                        uid: doc.payload.doc.id,
                        ...doc.payload.doc.data() as any
                      }
                    })
                  })
                )
  }

  deleteIngresoEgreso( uidItem: string ) {
    const _uid = this.authApp.userActive.uid;
    return this.firestore.doc( `${_uid}/ingresos-egresos/items/${uidItem}` ).delete();
  }

}
