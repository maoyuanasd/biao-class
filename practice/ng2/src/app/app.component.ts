import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng2';
  log=[]
  name: string = 'yooo'
  age: number = 15;
  onUpdate(eventData){
    this.log.push(eventData);
    console.log(eventData)
  }
}
