import { Component, OnInit } from '@angular/core';
import data from '../service/author'

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css']
})
export class AComponent implements OnInit {
 data=data.new();
  constructor() { }

  ngOnInit() {
  }

}
