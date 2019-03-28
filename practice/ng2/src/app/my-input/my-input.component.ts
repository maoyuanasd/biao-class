import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styles: []
})
export class MyInputComponent implements OnInit {
@Input() myModel:string;
@Output() myModelChange = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

}
