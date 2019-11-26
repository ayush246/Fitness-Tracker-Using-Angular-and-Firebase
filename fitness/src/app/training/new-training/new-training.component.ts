import { Component, OnInit, OnDestroy} from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit,OnDestroy {
  exercises:Exercise[];
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription=this.trainingService.exercisesChanged.subscribe(exercises=>this.exercises=exercises);
    this.trainingService.getAvailableExercises();

  }

  getExercises() {
    this.trainingService.getAvailableExercises();
  }

  onStartTraining(form: NgForm){
    this.trainingService.startExercise(form.value.exercise); //exercise was the name we assigned to mat select component
  }

  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
  }

}
