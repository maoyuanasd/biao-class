import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-way',
  template: `
   <h2>使用ngModel进行双向绑定</h2>
   <input [(ngModel)]="name">
   <div>{{name}}</div>

   <h2>双向绑定的原理</h2>
   <input [value]="name" (input)="name=$event.target.value">
  `,
  styles: []
})
export class TwoWayComponent implements OnInit {
name:string ='Yoooooooooo'
  constructor() { }

  ngOnInit() {
    setInterval(()=>{
      this.name='ha'
    },2000)
  }

}
