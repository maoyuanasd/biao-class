import { Component, OnInit } from '@angular/core';
import data from '../service/author'

@Component({
  selector: 'app-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css']
})
export class BComponent implements OnInit {
data=data.new()
  constructor() { }

  ngOnInit() {
  }

}
