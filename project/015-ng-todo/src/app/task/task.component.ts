import { Task } from './../model/task';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() data:Task; 
  @Output() completedChange=new EventEmitter();
  @Output() remove=new EventEmitter();
  @Output() fill=new EventEmitter();
  constructor() { }
  triggerRemove(){
    if(!confirm('确认删除'))
    return;
    this.remove.emit(this.data.id);

  }
  triggerFill(){
    this.fill.emit(this.data)
  }
  ngOnInit() {
  }

}
