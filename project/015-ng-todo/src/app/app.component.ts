import { TaskService } from './model/task.service';
import { Component } from '@angular/core';
import {Task} from './model/task'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-todo';
  form:Task={}
  constructor(private task:TaskService){
    task.read()
  }
  setCompleted(id: number, completed: boolean) {
    this.task.update(id, { completed });
  }
 createOrUpdate(row){
   let f=this.form;

   if(f.id){
    
     this.task.update(f.id,f)
   }else{
     this.task.create(f);
   }
   this.resetForm()
 }
 resetForm(){
   this.form={};
 }
 fill(data){
   this.form=data;
 }
}
