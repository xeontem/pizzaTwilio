import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ReactiveFormsModule } from '@angular/forms';  
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PizzaStatusComponent } from './pizza-status/pizza-status.component';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    AppComponent,
    PizzaStatusComponent
  ],
  providers: [AuthService],
  bootstrap: [ AppComponent ]
})
export class AppModule {}