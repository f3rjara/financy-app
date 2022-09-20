import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppState } from 'src/app/core/store/app.reducer';
import  * as ui from 'src/app/core/store/ui/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  public formRegister: FormGroup;
  public loadingApp: boolean = false;
  public loadingStore: Subscription;
  
  constructor( 
    private fb: FormBuilder,
    private authApp: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }
  
  ngOnInit() {
    this.formRegister = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(3) ]],
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(6) ]]
    });

    this.loadingStore = this.store.select('ui')
      .subscribe( ui => { this.loadingApp = ui.isLoading; });
  }

  ngOnDestroy(): void {
    this.loadingStore.unsubscribe();
  }


  createUser() {
    if( this.formRegister.invalid ) { return; }
    this.store.dispatch( ui.isLoading() );
    const { name, email, password } = this.formRegister.value;
    this.authApp.createUser( name, email, password )
    .then( user => { 
      this.store.dispatch( ui.stopLoading() );
      this.router.navigate(['/']); 
    })
    .catch(() => {
      console.log('error');
    })
  }
}
