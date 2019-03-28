import { Component } from '@angular/core';
import { TaskService } from './model/task.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-todo';
  form:TaskInterface={};
  constructor(private task:TaskService){
    task.read();
  }
  setCompleted(id,completed){
   this.task.update(id,{completed})
  }
  createOrUpdate(){
    let f=this.form;
    if(!f.title)
    return;
    if(f.id)
    this.task.update(f.id,f);
    else
    this.task.create(f);
    this.resetForm()
  }
  resetForm(){
    this.form={};
  }
  fill(id){
   this.form=this.task.find(id);
  }
}
