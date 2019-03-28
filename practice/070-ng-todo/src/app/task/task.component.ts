import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() data: TaskInterface;
  @Output() completedChange = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() update=new EventEmitter();

  constructor() { }
  triggerRemove() {
    if (!confirm('确认删除'))
      return
    this.remove.emit(this.data.id)
  }
  triggerUpdate(){
    this.update.emit(this.data.id)
  }
  ngOnInit() {
  }

}
