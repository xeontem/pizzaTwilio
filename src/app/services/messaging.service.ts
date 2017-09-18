import { Injectable }          from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth }     from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'


@Injectable()
export class MessagingService {
  body: string;
  title: string;
  icon: string;
  FCMmessages: any[];
  UID: string;
  messaging = firebase.messaging()
  currentMessage = new BehaviorSubject(null)
  
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }
  
  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {
      if (!user) return;
      this.UID = user.uid;
      const data = { [user.uid]: token }
      this.db.object('fcmTokens/').update(data)
    })
  }
  
  getPermission() {
    this.messaging.requestPermission()
    .then(() => {
      console.log('Notification permission granted.');
      return this.messaging.getToken()
    })
    .then(token => {
      console.log(token)
      this.updateToken(token)
    })
    .catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });
  }
  
  receiveMessage() {
      this.messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      this.currentMessage.next(payload);
    });
  }

  storeAndSendMessage() {
    this.db.object(`/FCMmessages/${this.UID}`)
    .map(msgs => {
      this.FCMmessages = msgs.length ? msgs : []})
    .take(1).map(msgs => {
      console.dir(this.FCMmessages)})
    .subscribe(msgs => {
      let mess = {
        body: this.body || '',
        title: this.title || '',
        icon: 'https://lh3.googleusercontent.com/-9WyEKa363Ek/AAAAAAAAAAI/AAAAAAACXaM/bOBuIAj0_P4/s60-p-rw-no/photo.jpg'
      }
      this.FCMmessages.push(mess);
    });
    this.db.object(`/FCMmessages/${this.UID}`).set(this.FCMmessages);
  }
}