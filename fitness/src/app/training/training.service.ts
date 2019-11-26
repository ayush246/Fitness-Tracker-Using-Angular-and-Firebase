import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable()
export class TrainingService {

    exerciseChanged=new Subject<Exercise>();
    exercisesChanged=new Subject<Exercise[]>();
    finishedExercisesChanged=new Subject<Exercise[]>();
    private availableExercises: Exercise[]=[];
    private runningExercise: Exercise;
    private fbSubs: Subscription[]=[];

    constructor(private db:AngularFirestore){};
    getAvailableExercises(){
        this.fbSubs.push(
        this.db.collection('availableExercises').snapshotChanges().pipe(map(docArray=>{
            return docArray.map(doc=>{
              return{
                id:doc.payload.doc.id,
                name: doc.payload.doc.data()['name'],
                duration: doc.payload.doc.data()['duration'],
                calories: doc.payload.doc.data()['calories'],
              }
            })
          })).subscribe((exercises:Exercise[])=>{
              this.availableExercises=exercises;
              this.exercisesChanged.next([...this.availableExercises]);
          }));
    };
    startExercise(selectedId: String){
        this.db.doc('availableExercises/'+selectedId).update({lastSelected:new Date()})
        this.runningExercise=this.availableExercises.find(ex=> ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise});
    }
    completeExercise(){
        //this.addDataTODatabase({...this.runningExercise,date:new Date(),state:'completed'});
        //can be used to select a single document and update it 'in this example we set new field last selected
        //which can be seen on firebase
        this.runningExercise=null;
        this.exerciseChanged.next(null);
    }
    cancelExercise(progress: number){
        this.addDataTODatabase({...this.runningExercise,duration:this.runningExercise.duration*(progress/100),
            calories:this.runningExercise.calories*(progress/100),date:new Date(),state:'cancelled'});
        this.runningExercise=null;
        this.exerciseChanged.next(null);
    }
    getRunningExercise(){
        return {...this.runningExercise}; // ... means copy of object
    }
    getCompletedOrCancelledExercises(){
        this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises:Exercise[])=>{
            this.finishedExercisesChanged.next(exercises);
        }));
    }
    cancelSubscriptions(){
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }
    private addDataTODatabase(exercise:Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}