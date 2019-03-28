import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event2',
  template: `
   <h2>自定义事件</h2>
  `,
  styles: []
})
export class Event2Component implements OnInit {
@Output() myChange= new EventEmitter()
  constructor() { }

  ngOnInit() {
    setInterval(()=>{
      this.myChange.emit('yo')
    },500)
  }

}
