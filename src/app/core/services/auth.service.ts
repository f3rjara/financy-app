import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private auth: AngularFireAuth, private firestore: AngularFirestore ) { }

  initAuthListener() {
    this.auth.authState.subscribe( ( fuser: firebase.User ) => {
      console.log(fuser);
    });
  }

  isAuth() {
    return this.auth.authState.pipe(
      map ( fbUser =>  fbUser != null )
    );
  }

  createUser( name:string, email:string, password:string ): Promise<void | firebase.auth.UserCredential> { 
    return this.auth.createUserWithEmailAndPassword( email, password )
            .then( ({ user }) => {
              const newUser = new User( user.uid, name, user.email );
              return this.firestore.doc(`${ user.uid }/user`).set( { ...newUser } );
            });
  } 

  loginUser( email: string, password: string ): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword( email, password );
  }
  
  logoutUser () {
    return this.auth.signOut();
  }
}
