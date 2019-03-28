import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  template: `
  <h2>原生事件</h2>
  <button (mouseenter)="log('mouse enter')" (click)="log()">click</button>
  <input type="text" (input)="name=$event.target.value">
  <div>{{name}}</div>
  `,
  styles: []
})
export class EventComponent implements OnInit {
  name:string;
  constructor() { }

  ngOnInit() {
    
  }
  log(val){
    console.log(val ||1);
  }

}
