import { Subject } from 'rxjs/Subject';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {

    authChange=new Subject<boolean>(); // indicating whether we are singed in or not
    private isAuthenticated=false;

    constructor(private router: Router,private afauth: AngularFireAuth,
                private trainingService: TrainingService,private snackbar: MatSnackBar){} 
    // afauth is name given to private variable of AngularFireAuth type
    // .auth is a function of this.afauth

    initAuthListener(){
        this.afauth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated=true; 
                this.authChange.next(true);
                this.router.navigate(['/training']);
            }else{
                this.trainingService.cancelSubscriptions(); 
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated=false;
            }
        });
    }

    registerUser(authData:AuthData){
        this.afauth.auth.createUserWithEmailAndPassword(authData.email,authData.password).then(result=>{
            console.log(result);
        }).catch(error=>{
            this.snackbar.open(error.message,null,{
                duration:3000 //opens the error message for 3 seconds
            });
        });   
    }
    login(authData:AuthData){
        this.afauth.auth.signInWithEmailAndPassword(authData.email,authData.password).then(result=>{
            console.log(result);
        }).catch(error=>{
            this.snackbar.open(error.message,null,{
                duration:3000 //opens the error message for 3 seconds
            });
        });   
    }
    logout(){
        this.afauth.auth.signOut();  
    }
    isAuth(){
        return this.isAuthenticated;
    }
}