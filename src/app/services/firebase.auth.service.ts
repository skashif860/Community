import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
    providedIn:  'root'
})
export class  FirebaseAuthService {
    user:  User;
    notification:any = [];
    constructor( public afAuth:  AngularFireAuth, public db:  AngularFireDatabase, public  router:  Router) { }

    firebaseLogin(login , password): any[] {
        this.afAuth.auth.signInWithEmailAndPassword(login, password)
        .then(value => {
          console.log('Nice, it worked!');
           this.db.list('/users/5/notifications').snapshotChanges().subscribe(data => {
            console.log('Nice, it worked!',data);
            let i = 0;
                  for (const val of data) {
                    this.notification[i] =  val.payload.val();
                    console.log('currentrespone', val.payload.val());
                    i++;
                  }
           });
           return this.notification;
        })
        .catch(err => {
          console.log('Something went wrong:', err.message);
        });

        return this.notification;
    }

}
