import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AppState } from '../store/app.reducer';
import * as authActions from '../store/auth/auth.actions';
import * as financyAct from '../store/financy/financy.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public  userSubscription: Subscription;
  private _userActive: User;

  constructor( 
    private auth: AngularFireAuth, 
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe( ( fuser: firebase.User ) => { 
      if ( fuser ) {
        this.userSubscription = this.firestore.doc(`${ fuser.uid }/user`).valueChanges()
          .subscribe( ( firestoreUser: any ) => {
            const user = User.fromFirebase( firestoreUser );
            this._userActive = user;
            this.store.dispatch( authActions.setUser( { user } ) );
          });
      } else {
        this._userActive = null;
        this.store.dispatch( authActions.unSetUser() );
        this.store.dispatch( financyAct.unsetRegisters() );
        this.userSubscription?.unsubscribe();
      }
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

  get userActive() {
    return { ...this._userActive };
  }
}
