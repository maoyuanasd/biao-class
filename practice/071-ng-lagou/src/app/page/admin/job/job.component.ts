import { JobInterface } from './../../../model/job.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class adminJobComponent implements OnInit {
  form:JobInterface={
    salary:{}
  }
  constructor() { }
  yo(it){
    console.log(it)
  }
  ngOnInit() {
  }

}
