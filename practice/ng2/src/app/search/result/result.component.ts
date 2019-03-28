import { Component, OnInit } from '@angular/core';
import {Person} from '../../person'


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
list=[
  new Person('王花花',18),
  new Person('李拴蛋',19),
  new Person('赵可爽',20)
]
  constructor() { }

  ngOnInit() {
  }

}
