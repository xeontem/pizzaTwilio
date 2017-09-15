import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Http, Jsonp } from '@angular/http';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit{
  email: string = '';
  password: string = '';
  message: string;
  sendTo: string;
  user: Observable<firebase.User>;
  pizzaData: FirebaseObjectObservable<any>;
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    public authService: AuthService,
    public http: Http,
    public Jsonp: Jsonp) {}
  
  ngOnInit() {
    if(this.authService.user) this.getDB();
  }
  
  getDB() {
    this.pizzaData = this.db.object('/');
    this.pizzaData.subscribe(obj => {
      this.message = obj.message;
      this.sendTo = obj.sendTo;
    })
  }
  
  updateData() {
    this.pizzaData.update({message: this.message, sendTo: this.sendTo})
      .then(res => console.log('data updated!'));
  }

  sendMessage() {
    this.Jsonp.get('https://us-central1-pizzatwilio.cloudfunctions.net/sendSMS1')
      .subscribe(d => console.log(d));
  }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }
}