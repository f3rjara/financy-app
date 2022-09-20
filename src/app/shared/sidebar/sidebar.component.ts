import { filter } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppState } from 'src/app/core/store/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  public userSubscription: Subscription;
  public userActive : User = { uid: '', name: '', email: '' };
  
  constructor( 
    private authApp: AuthService, 
    private router: Router,
    private store: Store<AppState>,
  ) { }
  

  ngOnInit() {
    this.userSubscription = this.store.select( 'user' )
      .pipe( filter ( auth => auth.user != null ) )
      .subscribe( ({ user }) => this.userActive = user );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logoutUser() {
    this.authApp.logoutUser().then( () => {
      this.router.navigate(['/login']);
    });
  }
}
